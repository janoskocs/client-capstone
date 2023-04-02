import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [momentsList, setMomentsList] = useState(null);
  useEffect(() => {
    const getMoments = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/moments`
        );
        console.log(data);
        setMomentsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMoments();
  }, []);

  return (
    <section className="home">
      <section className="moments">
        {momentsList &&
          momentsList.map((moment) => {
            return <p key={moment._id}>{moment.title}</p>;
          })}
      </section>
    </section>
  );
};

export default HomePage;
