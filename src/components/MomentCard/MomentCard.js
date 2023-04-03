import axios from "axios";
const MomentCard = ({ moment, getMoments }) => {
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}api/moments/${moment._id}`
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
