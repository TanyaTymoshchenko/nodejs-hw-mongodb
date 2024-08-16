import { env } from "./env.js";
import { saveFileToCloudinary } from "./saveFileToCloudinary.js";
import { saveFileToUploadDir } from "./saveFileToUploadDir.js";

export const savePhoto = async (photo) => {
  let photoURL;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      console.log("saving to cloudinary");
      photoURL = await saveFileToCloudinary(photo);
    } else {
      console.log("saving to upload dir");
      photoURL = await saveFileToUploadDir(photo);
    }
  }

return photoURL;
};