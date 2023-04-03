import React, { useEffect, useState } from "react";
import axios from "axios";

//Components
import MomentCard from "../components/MomentCard/MomentCard";
import MomentForm from "../components/MomentForm/MomentForm";

const HomePage = () => {
  const [momentsList, setMomentsList] = useState(null);

  const getMoments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/moments`
      );
      console.log(data);
      setMomentsList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMoments();
  }, []);

  return (
    <section className="home">
      <section className="moments">
        {momentsList &&
          momentsList.map((moment) => {
            return (
              <MomentCard
                getMoments={getMoments}
                key={moment._id}
                moment={moment}
              />
            );
          })}
      </section>

      <MomentForm getMoments={getMoments} />
    </section>
  );
};

export default HomePage;
