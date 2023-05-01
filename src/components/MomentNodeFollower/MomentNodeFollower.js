import "./MomentNodeFollower.scss";
import { NodeToolbar } from "reactflow";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";

const MomentNodeFollower = ({ data }) => {
  const { user } = useAuthContext();

  const [appreciated, setAppreciated] = useState(false);
  const [appreciationCount, setAppreciationCount] = useState();
  useEffect(() => {
    setAppreciationCount(data.data.appreciatedBy.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      if (!appreciated) {
        setAppreciationCount(appreciationCount + 1);
      }
      setAppreciated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const appreciateString =
    appreciationCount === 0
      ? `Be the first to appreciate this moment.`
      : `Appreciated by ${
          appreciationCount === 1 ? `1 person.` : `${appreciationCount} people.`
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
              disabled={appreciated}
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
