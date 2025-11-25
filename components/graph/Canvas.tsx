'use client';

import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
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
import GitMVPLogo from '@/components/GitMVPLogo';

const nodeTypes = {
  branch: BranchNode,
  commit: CommitNode,
};

export default function Canvas() {
  const { nodes: storeNodes, edges: storeEdges } = useGraphStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  // Update local state when store changes
  useEffect(() => {
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);

  useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex-1 bg-gray-50 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <FlowControls />
        <MiniMap />
      </ReactFlow>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-md shadow-sm border border-border/50 text-sm text-foreground z-10">
        <a
          href="https://gitmvp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors font-medium"
        >
          <GitMVPLogo className="w-6 h-6" color="currentColor" />
          <span>Built with GitMVP</span>
        </a>
      </div>
    </div>
  );
}
