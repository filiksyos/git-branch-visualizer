'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useGraphStore } from '@/lib/store/graphStore';
import PresetSelector from '@/components/dialogs/PresetSelector';

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const { nodes, selectedBranches, toggleBranchSelection } = useGraphStore();

  const branchNodes = nodes.filter((node) => node.type === 'branch');
  const filteredBranches = branchNodes.filter((node) =>
    node.data.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-80 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-3">Branches</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search branches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2 border rounded-md text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredBranches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? 'No branches found' : 'No branches loaded'}
            </p>
            <button
              onClick={() => setIsPresetOpen(true)}
              className="text-sm text-primary hover:underline"
            >
              Load a preset graph
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBranches.map((node) => (
              <button
                key={node.id}
                onClick={() => toggleBranchSelection(node.data.label)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  selectedBranches.includes(node.data.label)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <div className="font-medium">{node.data.label}</div>
                {node.data.author && (
                  <div className="text-xs opacity-75 mt-1">
                    by {node.data.author}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={() => setIsPresetOpen(true)}
          className="w-full px-4 py-2 border rounded-md text-sm hover:bg-accent transition"
        >
          Load Preset Graph
        </button>
      </div>

      <PresetSelector open={isPresetOpen} onOpenChange={setIsPresetOpen} />
    </aside>
  );
}
