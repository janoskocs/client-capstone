import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

export const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  //Firebase configuration
  const {
    REACT_APP_FB_API_KEY: apiKey,
    REACT_APP_FB_AUTH_DOMAIN: authDomain,
    REACT_APP_FB_PROJECT_ID: projectId,
    REACT_APP_FB_STORAGE_BUCKET: storageBucket,
    REACT_APP_FB_MESSAGING_SENDER_ID: messagingSenderId,
    REACT_APP_FB_APP_ID: appId,
  } = process.env;

  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
  };

  //Initialize app and get bucket
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, `gs://${storageBucket}`);

  const uploadImage = async (imageFile) => {
    //Create a storage ref for the new image, it's like a variable in Firebase for the image
    const storageRef = ref(storage, `moments/${imageFile[0].name}`);

    try {
      setIsUploading(true);
      const upload = await uploadBytes(storageRef, imageFile[0]);

      if (upload.name === imageFile[0].name) {
        setIsUploading(false);
        console.log("Image uploaded");
      }
      const url = await getDownloadURL(ref(storage, storageRef.fullPath));
      if (url) {
        setImgUrl(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { uploadImage, isUploading, imgUrl };
};
