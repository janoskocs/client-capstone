import "./FollowerBoard.scss";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

const FollowerBoard = () => {
  const { user } = useAuthContext();

  const [peopleIfollow, setPeopleIfollow] = useState(null);

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/shortened`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPeopleIfollow(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowers();
  }, []);

  console.log(peopleIfollow);

  useEffect(() => {}, [peopleIfollow]);

  if (!peopleIfollow) {
    return <p>Loading...</p>;
  }

  const iFollow = peopleIfollow.map((person) => {
    return (
      <article className="person" key={person._id}>
        <p className="person__text">
          {person.first_name} {person.last_name}
        </p>
        <img className="person__avatar" src={person.avatar} />
        <button className="person__btn" type="button">
          Unfollow
        </button>
      </article>
    );
  });

  return <section className="followers">{iFollow}</section>;
};

export default FollowerBoard;
