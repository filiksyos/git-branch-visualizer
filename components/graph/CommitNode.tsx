'use client';

import { Handle, Position } from '@xyflow/react';
import { GitCommit } from 'lucide-react';
import { formatDate } from '@/lib/graph/utils';

export default function CommitNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 rounded-lg border border-gray-300 bg-white shadow min-w-[250px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <GitCommit className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      {data.sha && (
        <div className="text-xs text-muted-foreground font-mono">
          {data.sha.substring(0, 7)}
        </div>
      )}
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        {data.author && <span>{data.author}</span>}
        {data.date && (
          <>
            <span>•</span>
            <span>{formatDate(data.date)}</span>
          </>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
