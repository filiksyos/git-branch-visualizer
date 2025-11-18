'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { fetchRepositoryData, parseGitHubUrl } from '@/lib/github/client';
import { branchesToGraph } from '@/lib/graph/utils';
import { useGraphStore } from '@/lib/store/graphStore';
import { useAnimationStore } from '@/lib/store/animationStore';

interface RepoInputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RepoInputDialog({ open, onOpenChange }: RepoInputDialogProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setNodes, setEdges } = useGraphStore();
  const { setTotalSteps } = useAnimationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const parsed = parseGitHubUrl(url);
      if (!parsed) {
        throw new Error('Invalid GitHub URL format');
      }

      const { branches, commits } = await fetchRepositoryData(
        parsed.owner,
        parsed.repo
      );

      const { nodes, edges } = branchesToGraph(branches, commits);
      setNodes(nodes);
      setEdges(edges);
      setTotalSteps(commits.length);
      onOpenChange(false);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repository');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Load GitHub Repository</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Repository URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="owner/repo or https://github.com/owner/repo"
              className="w-full px-3 py-2 border rounded-md"
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Examples: facebook/react, vercel/next.js
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 flex items-center justify-center gap-2"
              disabled={loading || !url}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Load
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
