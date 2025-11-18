'use client';

import { X } from 'lucide-react';
import { presetGraphs } from '@/lib/graph/presets';
import { useGraphStore } from '@/lib/store/graphStore';
import { useAnimationStore } from '@/lib/store/animationStore';

interface PresetSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PresetSelector({ open, onOpenChange }: PresetSelectorProps) {
  const { setNodes, setEdges } = useGraphStore();
  const { setTotalSteps, reset } = useAnimationStore();

  const handleSelectPreset = (preset: typeof presetGraphs[0]) => {
    setNodes(preset.nodes);
    setEdges(preset.edges);
    setTotalSteps(preset.nodes.filter(n => n.type === 'commit').length);
    reset();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Select Preset Graph</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          {presetGraphs.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold mb-1">{preset.name}</h3>
              <p className="text-sm text-muted-foreground">
                {preset.description}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                {preset.nodes.length} nodes • {preset.edges.length} connections
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
