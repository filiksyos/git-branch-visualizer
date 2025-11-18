'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls as FlowControls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
} from '@xyflow/react';
import { useGraphStore } from '@/lib/store/graphStore';
import BranchNode from './BranchNode';
import CommitNode from './CommitNode';

const nodeTypes = {
  branch: BranchNode,
  commit: CommitNode,
};

export default function Canvas() {
  const { nodes: storeNodes, edges: storeEdges } = useGraphStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  // Update local state when store changes
  React.useEffect(() => {
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);

  React.useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex-1 bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <FlowControls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
