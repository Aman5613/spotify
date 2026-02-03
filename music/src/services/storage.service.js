import ImageKit from "imagekit";
import config from "../config/config.js";

const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export const uploadMusic = async (file) => {
  try {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: file.originalname,
        folder: "/spotify-piper/music",
        useUniqueFileName: true,
      },
      function (error, result) {
        if (error) {
          console.error("Error uploading music:", error);
        } else {
          console.log("Music uploaded successfully:", result);
          return result;
        }
      },
    );
  } catch (error) {
    console.error("Error uploading music:", error.message || error);
  }
};

export const uploadImage = async (file) => {
  try {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: file.originalname,
        folder: "/spotify-piper/images",
        useUniqueFileName: true,
      },
      function (error, result) {
        if (error) {
          console.error("Error uploading image:", error);
        } else {
          console.log("Image uploaded successfully:", result);
          return result;
        }
      },
    );
  } catch (error) {
    console.error("Error uploading image:", error.message || error);
  }
};
