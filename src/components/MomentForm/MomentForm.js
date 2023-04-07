import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUploadImage } from "../../hooks/useUploadImage";

const MomentForm = ({ getMoments }) => {
  const { uploadImage, isUploading, imgUrl } = useUploadImage();

  //Get user from context
  const { user } = useAuthContext();

  //Initialise input states
  const [momentDetails, setMomentDetails] = useState({
    title: "",
    content: "",
  });
  const [imageToBeUploaded, setImageToBeUploaded] = useState(null);

  const [mood, setMood] = useState({ mood: 15 }); // sets the mood :D

  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setMomentDetails({ ...momentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await uploadImage(imageToBeUploaded);

    if (!user) {
      setError("You must be logged in.");
      return <p>{error}</p>;
    }
    const moment = { ...momentDetails, ...mood };

    try {
      // uploadImage(imageToBeUploaded[0]);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/moments/`,
        moment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getMoments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Capture a moment</h3>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        onChange={(e) => handleInput(e)}
        value={momentDetails.title}
      />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        name="content"
        onChange={(e) => handleInput(e)}
        value={momentDetails.content}
      />

      <input
        type="file"
        name="image-upload"
        onChange={(e) => {
          setImageToBeUploaded(e.target.files);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MomentForm;
