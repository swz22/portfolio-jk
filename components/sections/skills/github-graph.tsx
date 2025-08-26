'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export function GitHubGraph() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContributions();
  }, []);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, contributions]);

  const fetchContributions = async () => {
    try {
      const response = await fetch('/api/github/contributions');
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const allDays = data.contributions.weeks.flatMap(
        (week: ContributionWeek) => week.contributionDays
      );

      setContributions(allDays);
      setTotalContributions(data.contributions.totalContributions);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch contributions:', err);
      setError(true);
      setLoading(false);
      generateMockData();
    }
  };

  const generateMockData = () => {
    const weeks = 53;
    const daysPerWeek = 7;
    const days: ContributionDay[] = [];
    const today = new Date();

    for (let week = weeks - 1; week >= 0; week--) {
      for (let day = 0; day < daysPerWeek; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + day));

        const count = Math.floor(Math.random() * 20);
        days.push({
          date: date.toISOString().split('T')[0],
          contributionCount: count,
          color: getColorForCount(count),
        });
      }
    }

    setContributions(days);
    setTotalContributions(
      days.reduce((sum, day) => sum + day.contributionCount, 0)
    );
  };

  const getColorForCount = (count: number): string => {
    if (count === 0) return 'bg-secondary';
    if (count <= 5) return 'bg-green-900';
    if (count <= 10) return 'bg-green-700';
    if (count <= 15) return 'bg-green-500';
    return 'bg-green-400';
  };

  const getColorFromGitHub = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      '#ebedf0': 'bg-secondary',
      '#9be9a8': 'bg-green-900',
      '#40c463': 'bg-green-700',
      '#30a14e': 'bg-green-500',
      '#216e39': 'bg-green-400',
    };
    return colorMap[color] || 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">GitHub Contributions</h3>
          <div className="h-4 w-32 animate-pulse rounded bg-secondary/50" />
        </div>
        <div className="h-[120px] animate-pulse rounded bg-secondary/20" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">GitHub Contributions</h3>
        <span className="text-sm text-muted-foreground">
          {totalContributions.toLocaleString()} contributions this year
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-lg bg-secondary/10 p-2">
        <div className="overflow-x-auto" ref={scrollRef}>
          <div className="inline-grid grid-flow-col grid-rows-7 gap-1">
            {contributions.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: (index % 7) * 0.01 + Math.floor(index / 7) * 0.005,
                }}
                className={cn(
                  'h-3 w-3 rounded-sm',
                  error
                    ? getColorForCount(day.contributionCount)
                    : getColorFromGitHub(day.color)
                )}
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn('h-3 w-3 rounded-sm', getColorForCount(level * 5))}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
