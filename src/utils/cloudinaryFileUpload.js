import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // This is the builtin filesystem instance in node.js for handling filesystem

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileLocalPath) => {
  try {
    console.log("File is in uploadOnCloudinary ", fileLocalPath);
    if (!fileLocalPath) return null;

    // Upload the file on the cloudinary
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });

    // file has been uploaded on the cloudinary successfully
    // console.log("file uploaded successfully", response.url);
    fs.unlinkSync(fileLocalPath);

    return response;
  } catch (error) {
    fs.unlinkSync(fileLocalPath); // remove temporary file locally if it exists locally as the upload operation got failed
    return null;
  }
};

const uploadVideoOnCloudinary = async (fileLocalPath) => {
  try {
    console.log("File is in uploadOnCloudinary ", fileLocalPath);
    if (!fileLocalPath) return null;

    // Upload the file on the cloudinary
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "video",
    });

    // file has been uploaded on the cloudinary successfully
    // console.log("file uploaded successfully", response.url);
    fs.unlinkSync(fileLocalPath);

    return response;
  } catch (error) {
    fs.unlinkSync(fileLocalPath); // remove temporary file locally if it exists locally as the upload operation got failed
    return null;
  }
};

// FIXED: Add file delete utility function for cloudinary
/**
 * Using uploader.destroy(publicId, cb) this method
 */

const deleteOldFileInCloudinary = async (oldImagePublicId) => {
  const response = await cloudinary.uploader.destroy(
    oldImagePublicId,
    {
      resource_type: "image",
    },
    (result) => {
      console.log("Delete result", result);
    }
  );

  return response;
};

const deleteOldVideoFileInCloudinary = async (oldVideoPublicId) => {
  const response = await cloudinary.uploader.destroy(
    oldVideoPublicId,
    {
      resource_type: "image",
    },
    (result) => {
      console.log("Delete result", result);
    }
  );

  return response;
};

export {
  uploadOnCloudinary,
  uploadVideoOnCloudinary,
  deleteOldFileInCloudinary,
  deleteOldVideoFileInCloudinary
};
