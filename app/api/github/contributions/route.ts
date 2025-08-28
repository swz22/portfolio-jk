import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'swz22';

// Simple cache to avoid hitting API too frequently
let cachedData: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }

    // Check if GitHub token is available
    if (!GITHUB_TOKEN) {
      console.warn('GitHub token not available, returning mock data');
      // Return mock data if no token
      const mockData = {
        contributions: {
          totalContributions: 1200,
          weeks: Array.from({ length: 53 }, (_, weekIndex) =>
            Array.from({ length: 7 }, (_, dayIndex) => {
              const date = new Date();
              date.setDate(date.getDate() - (52 - weekIndex) * 7 + dayIndex);
              const count = Math.floor(Math.random() * 10);
              return {
                contributionCount: count,
                date: date.toISOString().split('T')[0],
                color: count === 0 ? '#ebedf0' : count <= 3 ? '#9be9a8' : count <= 6 ? '#40c463' : '#30a14e'
              };
            })
          ).flat().reduce((weeks: any[], day, index) => {
            const weekIndex = Math.floor(index / 7);
            if (!weeks[weekIndex]) {
              weeks[weekIndex] = { contributionDays: [] };
            }
            weeks[weekIndex].contributionDays.push(day);
            return weeks;
          }, [])
        }
      };
      
      cachedData = mockData;
      cacheTimestamp = now;
      return NextResponse.json(mockData);
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const result = {
      contributions: data.data.user.contributionsCollection.contributionCalendar,
    };

    // Cache the successful response
    cachedData = result;
    cacheTimestamp = now;

    return NextResponse.json(result);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
}