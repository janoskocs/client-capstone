import { Handle, Position } from "reactflow";
import "./MomentNode.scss";
const handleStyle = { left: 10 };

const MomentNode = ({ data }) => {
  if (!data.data) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <section className="moment">
        <h4 className="moment__title">{data.data.title}</h4>
        <p className="moment__text">{data.data.content}</p>
        <img src="" alt="" className="moment__img" />
      </section>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
};

export default MomentNode;
