import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./FindFollowers.scss";

const FindFollowers = () => {
  const { user } = useAuthContext();
  const [allUsers, setAllUsers] = useState(null);
  const [searchResults, setSearchResults] = useState(
    "Your search results will show up here."
  );

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAllUsers(data);
    };

    getUsers();
  }, []);

  return (
    <section className="page">
      <div className="page__top">
        <h2 className="page__title">Find new connections</h2>
        <input
          className="page__input"
          type="text"
          placeholder="Start typing to find followers..."
        />
      </div>

      <section className="results">{searchResults}</section>
    </section>
  );
};

export default FindFollowers;
