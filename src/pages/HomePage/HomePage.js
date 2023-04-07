import "./HomePage.scss";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

import { useAuthContext } from "../../hooks/useAuthContext";
//Components
import MomentCard from "../../components/MomentCard/MomentCard";
import MomentForm from "../../components/MomentForm/MomentForm";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import MomentNode from "../../components/MomentNode/MomentNode";

const HomePage = () => {
  const nodeTypes = useMemo(() => ({ momentNode: MomentNode }), []);

  const [momentsList, setMomentsList] = useState(null);
  const { user } = useAuthContext();

  const getMoments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/moments`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setMomentsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getMoments();
    }
  }, [user]);

  //Board related
  useEffect(() => {
    const nodeArrayOfMoments = [];
    console.log(momentsList);

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
      console.log(nodeArrayOfMoments);
    }

    /*
    1. Make an array
    Create a loop here
    2. Build a node object
    3. Append node object to array

    4. setNodes to the array

    */
    setNodes(nodeArrayOfMoments);
  }, [momentsList]);

  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  const initialNode = [
    { id: "1", position: { x: 0, y: 100 }, data: { data: "No moments." } },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <section className="home">
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible" />
        <label htmlFor="collapsible1">Capture the moment</label>
        <div className="collapsible-body">
          <MomentForm getMoments={getMoments} />
        </div>
      </div>
      {/* 
      <section className="moments">
        {momentsList &&
          momentsList.map((moment) => {
            return (
              <MomentCard
                getMoments={getMoments}
                key={moment._id}
                moment={moment}
              />
            );
          })}
      </section> */}

      <section className="" style={{ width: "100vw", height: "60vh" }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            // edges={edges}
            onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            nodeTypes={nodeTypes}
          />
          {/* 
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} /> */}
        </ReactFlowProvider>
      </section>
    </section>
  );
};

export default HomePage;
