import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUploadImage } from "../../hooks/useUploadImage";

import "./MomentForm.scss";

const MomentForm = ({ getMoments }) => {
  //Get user from context
  const { user } = useAuthContext();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [uploadStatusMessage, setUploadStatusMessage] =
    useState("Capture the moment");
  //Initialise input states
  const { uploadImage, imgUrl } = useUploadImage();
  const [momentDetails, setMomentDetails] = useState({
    content: "",
  });
  const [imageToBeUploaded, setImageToBeUploaded] = useState(null);

  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setMomentDetails({ ...momentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return <p>{error}</p>;
    }

    try {
      //Uploads image and returns its url
      const url = await uploadImage(imageToBeUploaded);
      const moment = { ...momentDetails, image_url: url };
      console.log("here");
      postMoment(moment);
    } catch (error) {
      return <p>Something went wrong. {error}</p>;
    }
  };

  const postMoment = async (moment) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/moments/`,
        moment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsCollapsed(false);
      setUploadStatusMessage("Moment captured ✅");
      getMoments(user._id);

      setTimeout(() => {
        setUploadStatusMessage("Capture the moment");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="collapsible">
      <input
        id="collapsible1"
        type="checkbox"
        name="collapsible"
        checked={isCollapsed}
        onChange={() => setIsCollapsed(!isCollapsed)}
      />
      <label htmlFor="collapsible1">{uploadStatusMessage}</label>
      <div className="collapsible-body">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="form__title">Capture a moment</h3>

          <input
            className="form__text"
            placeholder="Share this moment..."
            type="text"
            name="content"
            onChange={(e) => handleInput(e)}
            value={momentDetails.content}
          />

          <input
            className="form__file"
            type="file"
            name="image-upload"
            onChange={(e) => {
              setImageToBeUploaded(e.target.files);
            }}
          />

          {imgUrl && <p>Image uploaded.</p>}
          <button className="form__submit btn-block" type="submit">
            Capture this moment
          </button>
        </form>
      </div>
    </div>
  );
};

export default MomentForm;
