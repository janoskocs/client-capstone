import "./Followers.scss";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Followers = () => {
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

  useEffect(() => {}, [peopleIfollow]);

  if (!peopleIfollow) {
    return <p>Loading...</p>;
  }

  const iFollow = peopleIfollow.map((person) => {
    return (
      <article className="person" key={person._id}>
        <Link to={`/followers/board/${person._id}`}>
          <img className="person__avatar" src={person.avatar} alt="Avatar" />
          <p className="person__text">
            {person.first_name} {person.last_name}
          </p>
        </Link>
        <button className="person__btn" type="button">
          Unfollow
        </button>
      </article>
    );
  });

  //Need to implement my followers
  const myFollowers = peopleIfollow.map((person) => {
    return (
      <article className="person" key={person._id}>
        <Link to={`/${person._id}`}>
          <img className="person__avatar" src={person.avatar} alt="Avatar" />
          <p className="person__text">
            {person.first_name} {person.last_name}
          </p>
        </Link>
        <button className="person__btn" type="button">
          Unfollow
        </button>
      </article>
    );
  });

  return (
    <>
      <section className="followers">
        <h4>People I follow</h4>
        {iFollow}
      </section>
      <section className="followers">
        <h4>My followers</h4>
      </section>
    </>
  );
};

export default Followers;
