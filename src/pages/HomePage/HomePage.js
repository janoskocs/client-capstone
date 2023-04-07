import "./HomePage.scss";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

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
  }, [user]);

  //Board related
  useEffect(() => {
    const nodeArrayOfMoments = [];

    //Once we have momentList array then loop over it
    if (momentsList) {
      momentsList.forEach((moment, index) => {
        const momentNode = {
          id: index.toString(),
          position: { x: 0, y: index + 10 },
          type: "momentNode",
          data: { data: moment },
        };
        nodeArrayOfMoments.push(momentNode);
      });
    }

    setNodes(nodeArrayOfMoments);
  }, [momentsList]);

  const initialNode = [
    { id: "1", position: { x: 0, y: 100 }, data: { data: "No moments." } },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);

  return (
    <section className="home">
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible" />
        <label htmlFor="collapsible1">Capture the moment</label>
        <div className="collapsible-body">
          <MomentForm getMoments={getMoments} />
        </div>
      </div>

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
