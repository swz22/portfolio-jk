'use client';

import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function GitHubGraph() {
  const weeks = 53;
  const daysPerWeek = 7;

  const generateMockData = (): ContributionDay[] => {
    const days: ContributionDay[] = [];
    const today = new Date();

    for (let week = weeks - 1; week >= 0; week--) {
      for (let day = 0; day < daysPerWeek; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + day));

        const count = Math.floor(Math.random() * 20);
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count > 0) level = 1;
        if (count > 5) level = 2;
        if (count > 10) level = 3;
        if (count > 15) level = 4;

        days.push({
          date: date.toISOString().split('T')[0],
          count,
          level,
        });
      }
    }

    return days;
  };

  const contributions = generateMockData();
  const totalContributions = contributions.reduce(
    (sum, day) => sum + day.count,
    0
  );

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-secondary';
      case 1:
        return 'bg-green-900';
      case 2:
        return 'bg-green-700';
      case 3:
        return 'bg-green-500';
      case 4:
        return 'bg-green-400';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">GitHub Contributions</h3>
        <span className="text-muted-foreground text-sm">
          {totalContributions.toLocaleString()} contributions this year
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-grid grid-flow-col grid-rows-7 gap-1 p-2">
          {contributions.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.2,
                delay: (index % 7) * 0.01 + Math.floor(index / 7) * 0.005,
              }}
              className={cn('h-3 w-3 rounded-sm', getColor(day.level))}
              title={`${day.count} contributions on ${day.date}`}
            />
          ))}
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn('h-3 w-3 rounded-sm', getColor(level))}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
}
