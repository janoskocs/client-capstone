import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./FindFollowers.scss";

const FindFollowers = () => {
  const { user } = useAuthContext();
  const [input, setInput] = useState("");
  const [peopleIFollow, setPeopleIFollow] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const getUsers = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}api/user/allusers/search`,
      {
        searchInput: input,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setSearchResults(data);
  };

  const getPeopleIFollow = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/user/allusers/shortened`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setPeopleIFollow(data);
  };

  useEffect(() => {
    if (!input) {
      return;
    }
    getPeopleIFollow();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleFollow = async (follower_id) => {
    try {
      await axios.patch(
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
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (follower_id) => {
    try {
      await axios.patch(
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
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResults =
    searchResults &&
    searchResults.map((result) => {
      const personIFollow =
        peopleIFollow &&
        peopleIFollow.find((person) => person._id === result._id);
      return (
        <article key={result._id} className="result">
          <div className="result__side">
            <img
              className="result__avatar"
              src={result.avatar}
              alt="User avatar"
            />
          </div>
          <div className="result__side">
            <p>{result.first_name}</p>
            <p>{result.last_name}</p>
          </div>
          {personIFollow ? (
            <button onClick={() => handleUnfollow(result._id)}>Unfollow</button>
          ) : (
            <button onClick={() => handleFollow(result._id)}>Follow</button>
          )}
        </article>
      );
    });
  return (
    <div className="wrapper">
      <section className="page">
        <div className="page__top">
          <h2 className="page__title">Find new connections</h2>
          <input
            className="page__input"
            type="text"
            placeholder="Start typing to find people..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        <section className="results">
          {!input && <p>Your results will show up here.</p>}
          {filteredResults}
        </section>
      </section>
    </div>
  );
};

export default FindFollowers;
