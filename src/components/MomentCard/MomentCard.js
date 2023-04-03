import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
const MomentCard = ({ moment, getMoments }) => {
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}api/moments/${moment._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getMoments();
      console.log(data, "deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="moment">
      <h4 className="moment__title">{moment.title}</h4>
      <p className="moment__content">{moment.content}</p>
      <p className="moment__mood">{moment.mood}</p>
      <p className="moment__time">{moment.createdAt}</p>
      <button onClick={handleDelete}>Delete</button>
      <button>Like</button>
    </section>
  );
};

export default MomentCard;
