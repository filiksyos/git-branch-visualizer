import { useEffect } from 'react';
import { useAnimationStore } from '@/lib/store/animationStore';
import { useGraphStore } from '@/lib/store/graphStore';

export function useGraphAnimation() {
  const { currentStep, isPlaying } = useAnimationStore();
  const { nodes, edges, setNodes, setEdges } = useGraphStore();

  useEffect(() => {
    if (!isPlaying) return;

    // Filter visible nodes and edges based on current step
    const visibleNodes = nodes.slice(0, currentStep + 1);
    const visibleEdges = edges.filter((edge) => {
      const sourceIndex = nodes.findIndex((n) => n.id === edge.source);
      const targetIndex = nodes.findIndex((n) => n.id === edge.target);
      return sourceIndex <= currentStep && targetIndex <= currentStep;
    });

    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [currentStep, isPlaying, nodes, edges, setNodes, setEdges]);
}
