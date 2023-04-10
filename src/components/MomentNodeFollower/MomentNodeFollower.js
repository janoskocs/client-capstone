import "./MomentNodeFollower.scss";
import { NodeToolbar } from "reactflow";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useState } from "react";
import TimeAgo from "react-timeago";

const MomentNodeFollower = ({ data }) => {
  const { user } = useAuthContext();

  const [appreciated, setAppreciated] = useState(false);

  if (!data.data) {
    return <p>Loading</p>;
  }
  //If moment is appreciated, then send request to DB
  //If user refreshes, user will get updated board moments from DB
  const handleAppreciate = async (_id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}api/moments/appreciate/${_id}`,
        {
          friend_id: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppreciated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const appreciateString =
    data.data.appreciatedBy.length === 0
      ? `Be the first to appreciate this moment.`
      : `Appreciated by ${
          data.data.appreciatedBy.length === 1
            ? `1 person.`
            : `${data.data.appreciatedBy.length} people.`
        }`;

  return (
    <>
      <section className="moment">
        <img
          src={data.data.image_url}
          alt="User media"
          className="moment__img"
        />
        <p className="moment__text">
          <span className="moment__user">{data.data.name} </span>
          {data.data.content}
        </p>
        <p>{appreciateString}</p>
        <TimeAgo date={data.data.createdAt} />
        <NodeToolbar isVisible={data.toolbarVisible} position={"bottom"}>
          <div className="moment__actions">
            <button
              type="button"
              onClick={(e) => handleAppreciate(data.data._id)}
            >
              {appreciated ? "Appreciated" : "Appreciate"}
            </button>
          </div>
        </NodeToolbar>
      </section>
    </>
  );
};

export default MomentNodeFollower;
