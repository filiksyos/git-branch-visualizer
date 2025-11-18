export interface Branch {
  name: string;
  sha: string;
  author: string;
  date: string;
  message: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  parents?: string[];
}

export interface GraphNode {
  id: string;
  type: 'branch' | 'commit';
  data: {
    label: string;
    branch?: string;
    sha?: string;
    author?: string;
    date?: string;
    message?: string;
  };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
}

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
}

export interface PresetGraph {
  id: string;
  name: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}
