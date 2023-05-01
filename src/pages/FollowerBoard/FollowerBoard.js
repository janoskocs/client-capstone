import { useParams } from "react-router-dom";
import { useGetMoments } from "../../hooks/useGetMoments";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Board from "../../components/Board/Board";
import "./FollowerBoard.scss";

const FollowerBoard = () => {
  const { user } = useAuthContext();
  const { momentsList, getMoments } = useGetMoments();
  const { followerId } = useParams();

  const [followerDetails, setFollowerDetails] = useState(null);

  useEffect(() => {
    getMoments(followerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getFollowerDetails = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/shortened/${followerId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFollowerDetails(data[0]);
    };
    getFollowerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!momentsList) {
    return <p>Loading..</p>;
  }
  if (!followerDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Board momentsList={momentsList} firstName={followerDetails.first_name} />
  );
};

export default FollowerBoard;
