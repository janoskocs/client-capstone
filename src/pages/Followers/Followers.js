import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Followers.scss";

const Followers = () => {
  const { user } = useAuthContext();

  const [peopleIfollow, setPeopleIfollow] = useState(null);
  const [myFollowers, setMyFollowers] = useState(null);

  const getPeopleIFollow = async () => {
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

  const getMyFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/shortened/myfollowers`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMyFollowers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPeopleIFollow();
    getMyFollowers();
  }, []);

  useEffect(() => {}, [peopleIfollow]);

  const handleFollow = async (follower_id) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/${user._id}`,
        {
          follower_id: follower_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getPeopleIFollow();
      getMyFollowers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (follower_id) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/unfollow/${user._id}`,
        {
          follower_id: follower_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getPeopleIFollow();
      getMyFollowers();
    } catch (error) {
      console.log(error);
    }
  };

  if (!peopleIfollow) {
    return <p>Loading...</p>;
  }

  const iFollowJSX =
    peopleIfollow &&
    peopleIfollow.map((person) => {
      return (
        <article key={person._id} className="follower">
          <div className="follower__side">
            <Link
              className="follower__link"
              to={`/followers/board/${person._id}`}
            >
              <img
                className="follower__avatar"
                src={person.avatar}
                alt="User avatar"
              />
              Visit board
            </Link>
          </div>
          <div className="follower__side">
            <p>{person.first_name}</p>
            <p>{person.last_name}</p>
          </div>

          <button onClick={() => handleUnfollow(person._id)}>Unfollow</button>
        </article>
      );
    });

  const myFollowersJSX =
    myFollowers &&
    myFollowers.map((person) => {
      const personIFollow =
        peopleIfollow &&
        peopleIfollow.find((personIFollow) => personIFollow._id === person._id);
      return (
        <article key={person._id} className="follower">
          <div className="follower__side">
            <Link
              className="follower__link"
              to={`/followers/board/${person._id}`}
            >
              <img
                className="follower__avatar"
                src={person.avatar}
                alt="User avatar"
              />
              Visit board
            </Link>
          </div>
          <div className="follower__side">
            <p>{person.first_name}</p>
            <p>{person.last_name}</p>
          </div>

          {personIFollow ? (
            <button onClick={() => handleUnfollow(person._id)}>Unfollow</button>
          ) : (
            <button onClick={() => handleFollow(person._id)}>Follow</button>
          )}
        </article>
      );
    });

  return (
    <div className="wrapper">
      <section className="page">
        <section className="followers">
          <h4 className="followers__title">People I follow</h4>
          {iFollowJSX}
        </section>
        <section className="followers">
          <h4>My followers</h4>
          {myFollowersJSX}
        </section>
      </section>
    </div>
  );
};

export default Followers;
