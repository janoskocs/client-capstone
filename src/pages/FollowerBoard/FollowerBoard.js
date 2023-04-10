import { useParams } from "react-router-dom";
import "./FollowerBoard.scss";
import { useGetMoments } from "../../hooks/useGetMoments";
import { useEffect, useState } from "react";

const FollowerBoard = () => {
  const { momentsList, getMoments } = useGetMoments();
  const { followerId } = useParams();

  useEffect(() => {
    getMoments(followerId);
  }, []);

  if (!momentsList) {
    console.log("notloaded");
    return <p>Loading..</p>;
  }

  console.log(momentsList);
  return <div>FollowerBoard</div>;
};

export default FollowerBoard;
