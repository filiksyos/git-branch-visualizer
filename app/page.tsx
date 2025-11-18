'use client';

import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Header from '@/components/layout/Header';
import Controls from '@/components/layout/Controls';
import Sidebar from '@/components/layout/Sidebar';
import Canvas from '@/components/graph/Canvas';

export default function Home() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Controls />
            <Canvas />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
