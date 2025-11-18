import { useMemo } from 'react';
import { useGraphStore } from '@/lib/store/graphStore';

export function useBranchFiltering(searchQuery: string) {
  const { nodes, selectedBranches } = useGraphStore();

  const filteredNodes = useMemo(() => {
    let filtered = nodes;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((node) =>
        node.data.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected branches
    if (selectedBranches.length > 0) {
      filtered = filtered.filter(
        (node) =>
          node.type !== 'branch' ||
          selectedBranches.includes(node.data.label)
      );
    }

    return filtered;
  }, [nodes, searchQuery, selectedBranches]);

  return filteredNodes;
}
