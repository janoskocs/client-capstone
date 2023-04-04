import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const FriendsPage = () => {
  const { user } = useAuthContext();
  const [allUsers, setAllUsers] = useState(null);

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
  console.log(allUsers, user);

  return (
    <section className="page">
      <h2 className="page__title">Friends</h2>

      <section className="find-followers">
        <input type="text" placeholder="Find followers..." />
        <button type="button">Search</button>

        {allUsers &&
          allUsers.map((user) => {
            return <p>{user.first_name}</p>;
          })}
      </section>

      <section className="my-followers"></section>
    </section>
  );
};

export default FriendsPage;
