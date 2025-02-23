import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETS,
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    console.log("file is uploaded", response.url); //not necessery

    fs.unlinkSync(localfilepath); //sync method of unlink the file path after uploading, this is must do method thats why better to keep it in sync

    // fs.unlink(localfilepath, (err) => {
    //     if (err) {
    //       console.error('Error deleting the path:', err);
    //     } else {
    //       console.log('path deleted successfully');
    //     }
    //   }); //async method of unlink the file path after uploading

    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export { uploadOnCloudinary };
