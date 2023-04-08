import "./HomePage.scss";
import React, { useEffect, useMemo } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
//Components
import MomentForm from "../../components/MomentForm/MomentForm";

import ReactFlow, { useNodesState, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import MomentNode from "../../components/MomentNode/MomentNode";
import { useGetMoments } from "../../hooks/useGetMoments";

const HomePage = () => {
  const { user } = useAuthContext();

  const nodeTypes = useMemo(() => ({ momentNode: MomentNode }), []);
  const { momentsList, getMoments } = useGetMoments();

  useEffect(() => {
    if (user) {
      getMoments();
    }
    //Disable warnings on dependency, it's all good :D
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          type: "momentNode",
          data: { data: moment },
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
    <section className="home">
      <MomentForm getMoments={getMoments} />

      <section className="" style={{ width: "100vw", height: "60vh" }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
          />
        </ReactFlowProvider>
      </section>
    </section>
  );
};

export default HomePage;
