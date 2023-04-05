import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuthContext } from "../../hooks/useAuthContext";
//Components
import MomentCard from "../../components/MomentCard/MomentCard";
import MomentForm from "../../components/MomentForm/MomentForm";

const HomePage = () => {
  const [momentsList, setMomentsList] = useState(null);
  const { user } = useAuthContext();

  const getMoments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/moments`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setMomentsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getMoments();
    }
  }, [user]);

  return (
    <section className="home">
      <div class="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible" />
        <label for="collapsible1">Capture the moment</label>
        <div class="collapsible-body">
          <MomentForm getMoments={getMoments} />
        </div>
      </div>
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
    </section>
  );
};

export default HomePage;
