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

  const followers =
    !allUsers ||
    allUsers.filter((person) => {
      return person._id === user._id;
    });

  console.log(followers);
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

      <section className="my-followers">
        <h3>My followers</h3>
      </section>
    </section>
  );
};

export default FriendsPage;
