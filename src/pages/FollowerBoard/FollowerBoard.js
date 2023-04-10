import { useParams } from "react-router-dom";
import "./FollowerBoard.scss";

const FollowerBoard = () => {
  const { followerId } = useParams();

  return <div>FollowerBoard</div>;
};

export default FollowerBoard;
