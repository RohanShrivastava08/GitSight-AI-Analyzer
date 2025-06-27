import { NextResponse } from 'next/server';
import type { PinnedRepo } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN is not set.");
    return NextResponse.json({ error: 'Server configuration error: GITHUB_TOKEN is not set. Please add it to your .env file.' }, { status: 500 });
  }

  const headers = {
    'Authorization': `bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const body = {
    query: `
      query($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `,
    variables: { username },
  };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`GitHub API responded with ${response.status}: ${errorBody}`);
        throw new Error(`GitHub API failed with status: ${response.status}`);
    }

    const { data } = await response.json();

    if (data.errors) {
        console.error('GitHub API returned errors:', data.errors);
        throw new Error('Failed to fetch pinned repositories from GitHub GraphQL API.');
    }

    const pinnedItems = data?.user?.pinnedItems?.nodes || [];
    
    const pinnedRepos: PinnedRepo[] = pinnedItems.map((item: any) => ({
      name: item.name,
      description: item.description,
      url: item.url,
      stargazers: item.stargazerCount,
      forks: item.forkCount,
      primaryLanguage: item.primaryLanguage,
    }));

    return NextResponse.json(pinnedRepos);

  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return NextResponse.json({ error: 'Failed to fetch pinned repositories.' }, { status: 500 });
  }
}
