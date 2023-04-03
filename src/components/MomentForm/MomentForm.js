import { useState } from "react";
import axios from "axios";
const MomentForm = ({ getMoments }) => {
  const [momentDetails, setMomentDetails] = useState({
    title: "",
    content: "",
  });

  const [mood, setMood] = useState({ mood: 15 }); // sets the mood :D

  const handleInput = (e) => {
    setMomentDetails({ ...momentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const moment = { ...momentDetails, ...mood };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/moments/`,
        moment
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
      <button>Submit</button>
    </form>
  );
};

export default MomentForm;
