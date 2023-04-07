import { Handle, Position } from "reactflow";
import "./MomentNode.scss";
const handleStyle = { left: 10 };

const MomentNode = ({ data }) => {
  if (!data.data) {
    return <p>Loading</p>;
  }

  return (
    <>
      <section className="moment">
        <h4 className="moment__title">{data.data.title}</h4>
        <p className="moment__text">{data.data.content}</p>
        {/* <img src="" alt="" className="moment__img" /> */}
      </section>
    </>
  );
};

export default MomentNode;
