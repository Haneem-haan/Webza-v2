import "server-only";

import { v2 as cloudinary } from "cloudinary";

const maxImageSize = 10 * 1024 * 1024;
const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudinary;
}

export function validateProjectImage(
  file: FormDataEntryValue | null
): file is File {
  return (
    typeof File !== "undefined" &&
    file instanceof File &&
    file.size > 0 &&
    file.size <= maxImageSize &&
    allowedImageTypes.has(file.type)
  );
}

export async function uploadProjectImage(
  file: File
): Promise<{ url: string; publicId: string }> {
  const configuredCloudinary = configureCloudinary();
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = configuredCloudinary.uploader.upload_stream(
      {
        folder: "webza/projects",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.secure_url || !result.public_id) {
          reject(new Error("Cloudinary did not return an uploaded image."));
          return;
        }

        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    stream.end(buffer);
  });
}

export async function deleteProjectImage(publicId: string): Promise<void> {
  const result = await configureCloudinary().uploader.destroy(publicId, {
    invalidate: true,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary image removal failed: ${result.result}`);
  }
}
