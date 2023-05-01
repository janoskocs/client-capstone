import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";

export const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(true);
  const [uploadError, setUploadError] = useState(null);
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
    const uniqueId = v4();
    const storageRef = ref(storage, `moments/${uniqueId}${imageFile[0].name}`);
    try {
      await uploadBytes(storageRef, imageFile[0]);
    } catch (error) {
      setUploadError(error);
    }
    //Returns the url of the uploaded image
    const url = await getDownloadURL(ref(storage, storageRef.fullPath));
    setIsUploading(false);
    return url;
  };

  return { uploadImage, isUploading, uploadError };
};
