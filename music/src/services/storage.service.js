import ImageKit from "imagekit";
import config from "../config/config.js";

const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export const uploadMusic = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: file.buffer,
          fileName: file.originalname,
          folder: "/spotify-piper/music",
          useUniqueFileName: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
    });

    return result;
  } catch (error) {
    console.error("Error uploading music:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: file.buffer,
          fileName: file.originalname,
          folder: "/spotify-piper/images",
          useUniqueFileName: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
    });

    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
