import { Branch, Commit, GraphNode, GraphEdge } from '@/types';

export function branchesToGraph(
  branches: Branch[],
  commits: Commit[]
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Create branch nodes
  branches.forEach((branch, index) => {
    nodes.push({
      id: `branch-${branch.name}`,
      type: 'branch',
      data: {
        label: branch.name,
        branch: branch.name,
        sha: branch.sha,
        author: branch.author,
        date: branch.date,
        message: branch.message,
      },
      position: { x: 200 + index * 250, y: 100 },
    });
  });

  // Create commit nodes
  commits.forEach((commit, index) => {
    nodes.push({
      id: `commit-${commit.sha}`,
      type: 'commit',
      data: {
        label: commit.message.split('\n')[0].substring(0, 50),
        sha: commit.sha,
        author: commit.author,
        date: commit.date,
        message: commit.message,
      },
      position: { x: 200, y: 250 + index * 100 },
    });

    // Connect commits
    if (index > 0) {
      edges.push({
        id: `edge-${commits[index - 1].sha}-${commit.sha}`,
        source: `commit-${commits[index - 1].sha}`,
        target: `commit-${commit.sha}`,
        animated: true,
      });
    }
  });

  // Connect branches to their latest commit
  branches.forEach((branch) => {
    const matchingCommit = commits.find((c) => c.sha === branch.sha);
    if (matchingCommit) {
      edges.push({
        id: `edge-branch-${branch.name}-${branch.sha}`,
        source: `branch-${branch.name}`,
        target: `commit-${branch.sha}`,
        type: 'smoothstep',
      });
    }
  });

  return { nodes, edges };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
