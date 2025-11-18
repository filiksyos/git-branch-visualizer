'use client';

import { Handle, Position } from '@xyflow/react';
import { GitBranch } from 'lucide-react';

export default function BranchNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 rounded-lg border-2 border-primary bg-white shadow-lg min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <GitBranch className="h-4 w-4 text-primary" />
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      {data.author && (
        <div className="text-xs text-muted-foreground">
          by {data.author}
        </div>
      )}
      {data.message && (
        <div className="text-xs text-muted-foreground mt-1 truncate">
          {data.message.split('\n')[0]}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
