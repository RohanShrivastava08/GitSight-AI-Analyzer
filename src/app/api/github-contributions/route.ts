
import { NextResponse } from 'next/server';
import type { ContributionData } from '@/types';

// Map GitHub's contribution levels to our 0-4 scale
const mapContributionLevel = (level: string): 0 | 1 | 2 | 3 | 4 => {
  switch (level) {
    case 'FIRST_QUARTILE':
      return 1;
    case 'SECOND_QUARTILE':
      return 2;
    case 'THIRD_QUARTILE':
      return 3;
    case 'FOURTH_QUARTILE':
      return 4;
    default:
      return 0;
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const year = searchParams.get('year');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  if (!year) {
    return NextResponse.json({ error: 'Year is required' }, { status: 400 });
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

  const from = new Date(`${year}-01-01T00:00:00Z`);
  const to = new Date(`${year}-12-31T23:59:59Z`);

  const body = {
    query: `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `,
    variables: { username, from: from.toISOString(), to: to.toISOString() },
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
        throw new Error('Failed to fetch contribution data from GitHub GraphQL API.');
    }

    const contributionCalendar = data?.user?.contributionsCollection?.contributionCalendar;

    if (!contributionCalendar) {
        return NextResponse.json([]);
    }
    
    const contributionData: ContributionData[] = contributionCalendar.weeks.flatMap(
      (week: any) =>
        week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          level: mapContributionLevel(day.contributionLevel),
        }))
    );

    return NextResponse.json(contributionData);

  } catch (error) {
    console.error('Error fetching contribution data:', error);
    return NextResponse.json({ error: 'Failed to fetch contribution data.' }, { status: 500 });
  }
}
