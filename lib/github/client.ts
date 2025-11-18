import { Branch, Commit } from '@/types';

export async function fetchRepositoryData(owner: string, repo: string) {
  try {
    const response = await fetch(
      `/api/github?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch repository data');
    }

    const data = await response.json();
    return {
      branches: data.branches as Branch[],
      commits: data.commits as Commit[],
    };
  } catch (error) {
    console.error('Error fetching repository:', error);
    throw error;
  }
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  // Support formats:
  // https://github.com/owner/repo
  // github.com/owner/repo
  // owner/repo
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)/,
    /^([^\/]+)\/([^\/]+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, ''),
      };
    }
  }

  return null;
}
