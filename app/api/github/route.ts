import { NextRequest, NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com';

interface BranchData {
  name: string;
  commit: {
    sha: string;
    commit: {
      author: {
        name: string;
        date: string;
      };
      message: string;
    };
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing owner or repo parameter' },
      { status: 400 }
    );
  }

  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch branches
    const branchesResponse = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/branches`,
      { headers }
    );

    if (!branchesResponse.ok) {
      throw new Error(`GitHub API error: ${branchesResponse.statusText}`);
    }

    const branches: BranchData[] = await branchesResponse.json();

    // Fetch commits for main/master branch
    const defaultBranch = branches.find(b => 
      b.name === 'main' || b.name === 'master'
    )?.name || branches[0]?.name;

    const commitsResponse = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/commits?sha=${defaultBranch}&per_page=20`,
      { headers }
    );

    const commits = commitsResponse.ok ? await commitsResponse.json() : [];

    return NextResponse.json({
      branches: branches.map(b => ({
        name: b.name,
        sha: b.commit.sha,
        author: b.commit.commit?.author?.name || 'Unknown',
        date: b.commit.commit?.author?.date || '',
        message: b.commit.commit?.message || '',
      })),
      commits: commits.slice(0, 10).map((c: any) => ({
        sha: c.sha,
        message: c.commit?.message || '',
        author: c.commit?.author?.name || 'Unknown',
        date: c.commit?.author?.date || '',
      })),
    });
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository data' },
      { status: 500 }
    );
  }
}
