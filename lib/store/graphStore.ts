import { create } from 'zustand';
import { GraphNode, GraphEdge } from '@/types';

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedBranches: string[];
  setNodes: (nodes: GraphNode[]) => void;
  setEdges: (edges: GraphEdge[]) => void;
  toggleBranchSelection: (branchName: string) => void;
  clearSelection: () => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [],
  edges: [],
  selectedBranches: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  toggleBranchSelection: (branchName) =>
    set((state) => ({
      selectedBranches: state.selectedBranches.includes(branchName)
        ? state.selectedBranches.filter((b) => b !== branchName)
        : [...state.selectedBranches, branchName],
    })),
  clearSelection: () => set({ selectedBranches: [] }),
}));
