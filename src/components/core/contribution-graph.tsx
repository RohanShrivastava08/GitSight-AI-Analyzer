
"use client";

import type { ContributionData } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const contributionColors = [
  "bg-muted",
  "bg-green-300/50 dark:bg-green-900/70",
  "bg-green-400/70 dark:bg-green-800/80",
  "bg-green-600/80 dark:bg-green-600/90",
  "bg-green-700 dark:bg-green-500",
];

export function ContributionGraph({ data, year }: { data: ContributionData[], year: number }) {
  const contributionsMap = new Map(data.map(c => [c.date, c]));

  const yearStartDate = new Date(year, 0, 1);
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeap ? 366 : 365;

  const days = Array.from({ length: totalDays }).map((_, i) => {
    const date = new Date(yearStartDate);
    date.setUTCDate(date.getUTCDate() + i);
    const dateString = date.toISOString().split('T')[0];
    return contributionsMap.get(dateString) || { date: dateString, count: 0, level: 0 };
  });

  const firstDayOffset = new Date(year, 0, 1).getUTCDay();

  const monthLabels = days
    .map((day, index) => ({ day, index }))
    .filter(d => new Date(d.day.date).getUTCDate() === 1)
    .map(d => ({
      month: new Date(d.day.date).toLocaleString('default', { month: 'short', timeZone: 'UTC' }),
      weekIndex: Math.floor((d.index + firstDayOffset) / 7),
    }))
    .reduce((acc, { month, weekIndex }) => {
       if (!acc.find(m => m.weekIndex === weekIndex)) {
          acc.push({ month, weekIndex });
       }
       return acc;
    }, [] as { month: string; weekIndex: number }[]);


  return (
    <TooltipProvider>
      <div className="overflow-x-auto p-1">
        <div className="relative">
          <div className="flex text-xs text-muted-foreground mb-2 pl-10">
            {monthLabels.map(({ month, weekIndex }) => (
              <div
                key={month + weekIndex}
                className="absolute"
                style={{ left: `${weekIndex * 14.5}px` }}
              >
                {month}
              </div>
            ))}
          </div>
          <div className="flex gap-[3px] pt-6">
            <div className="flex flex-col gap-[3px] pr-2 text-xs text-muted-foreground">
              <div className="h-2.5 w-4" />
              <div className="h-2.5">M</div>
              <div className="h-2.5" />
              <div className="h-2.5">W</div>
              <div className="h-2.5" />
              <div className="h-2.5">F</div>
              <div className="h-2.5" />
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`pad-start-${i}`} className="h-2.5 w-2.5" />
              ))}
              {days.map((day) => (
                <Tooltip key={day.date} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div
                      className={`h-2.5 w-2.5 rounded-sm ${contributionColors[day.level]}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium">
                      {day.count} contributions on {new Date(day.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>Less</span>
            {contributionColors.map((color, i) => (
                <div key={i} className={`h-2.5 w-2.5 rounded-sm ${color}`} />
            ))}
            <span>More</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
