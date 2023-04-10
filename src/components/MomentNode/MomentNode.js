import "./MomentNode.scss";
import { NodeToolbar } from "reactflow";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useState } from "react";
import TimeAgo from "react-timeago";

const MomentNode = ({ data }) => {
  const { user } = useAuthContext();
  //If moment is deleted, then send request to DB and hide this card
  //If user refreshes, user will get updated board moments from DB
  const [deleted, setDeleted] = useState(false);

  if (!data.data) {
    return <p>Loading</p>;
  }

  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}api/moments/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (deleted) {
    return;
  }
  const appreciateString =
    data.data.appreciatedBy.length === 0
      ? ``
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
          <span className="moment__user">{user.first_name} </span>
          {data.data.content}
        </p>
        <p>{appreciateString}</p>
        <TimeAgo date={data.data.createdAt} />

        <NodeToolbar isVisible={data.toolbarVisible} position={"bottom"}>
          <div className="moment__actions">
            <button type="button" onClick={(e) => handleDelete(data.data._id)}>
              Delete
            </button>
          </div>
        </NodeToolbar>
      </section>
    </>
  );
};

export default MomentNode;
