import "./Board.scss";
import ReactFlow, { useNodesState, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import React, { useEffect, useMemo } from "react";
import MomentNodeFollower from "../../components/MomentNodeFollower/MomentNodeFollower";

const Board = ({ momentsList, firstName }) => {
  const nodeTypes = useMemo(
    () => ({ MomentNodeFollower: MomentNodeFollower }),
    []
  );

  const randomNumber = (x) => {
    return Math.floor(Math.random() * x) + 1;
  };
  //Board related
  useEffect(() => {
    const nodeArrayOfMoments = [];

    //Once we have momentList array then loop over it
    if (momentsList) {
      momentsList.forEach((moment, index) => {
        const momentNode = {
          id: index.toString(),
          position: { x: randomNumber(1000), y: randomNumber(200) },
          type: "MomentNodeFollower",
          data: { data: { ...moment, name: firstName } },
        };
        nodeArrayOfMoments.push(momentNode);
      });
    }

    setNodes(nodeArrayOfMoments);
    //Disable warnings on dependency, it's all good :D
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [momentsList]);

  const initialNode = [
    { id: "1", position: { x: 0, y: 100 }, data: { data: "No moments." } },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);

  return (
    <section className="board board--friend">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
        />
      </ReactFlowProvider>
    </section>
  );
};

export default Board;
