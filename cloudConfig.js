const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

let storage;

if (process.env.CLOUD_API_KEY && process.env.CLOUD_API_KEY !== "your_cloud_api_key") {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "wanderlust_DEV",
      allowedFormats: ["png", "jpg", "jpeg"],
    },
  });
} else {
  // Fallback to memory config if Cloudinary keys are missing
  const multer = require("multer");
  storage = multer.memoryStorage();
}

module.exports = { cloudinary, storage };
