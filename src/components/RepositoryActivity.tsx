'use client';

import { RepositoryActivity as RepositoryActivityType } from '@/lib/analyzer';
import { formatDistanceToNow } from 'date-fns';

interface RepositoryActivityProps {
  activity: RepositoryActivityType;
}

export default function RepositoryActivity({ activity }: RepositoryActivityProps) {
  if (!activity) {
    return null;
  }

  if (activity.error) {
    return (
      <div className="bg-red-50 dark:bg-dracula-red dark:bg-opacity-10 border border-red-200 dark:border-dracula-red dark:border-opacity-30 text-red-700 dark:text-dracula-red px-4 py-3 rounded-md">
        Error analyzing repository activity: {activity.error}
      </div>
    );
  }

  // Format the last commit date
  let lastCommitFormatted;
  try {
    const lastCommitDate = new Date(activity.lastCommitDate);
    lastCommitFormatted = formatDistanceToNow(lastCommitDate, { addSuffix: true });
  } catch (error) {
    lastCommitFormatted = activity.lastCommitDate;
  }

  // Determine activity status color
  const getActivityStatusColor = () => {
    if (activity.activityScore >= 70) return 'bg-green-100 text-green-800 dark:bg-dracula-green dark:bg-opacity-20 dark:text-dracula-green';
    if (activity.activityScore >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-dracula-orange dark:bg-opacity-20 dark:text-dracula-orange';
    return 'bg-red-100 text-red-800 dark:bg-dracula-red dark:bg-opacity-20 dark:text-dracula-red';
  };

  const getScoreTextColor = () => {
    if (activity.activityScore >= 70) return 'text-green-600 dark:text-dracula-green';
    if (activity.activityScore >= 40) return 'text-yellow-600 dark:text-dracula-orange';
    return 'text-red-600 dark:text-dracula-red';
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 dark:text-dracula-foreground">Repository Activity</h2>
      
      <div className="card dark:bg-black dark:border-dracula-currentLine">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium mb-1 dark:text-dracula-foreground">Activity Score</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-200 dark:border-dracula-currentLine">
                <span className={`text-xl font-bold ${getScoreTextColor()}`}>
                  {activity.activityScore}
                </span>
              </div>
              <div className="ml-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActivityStatusColor()}`}>
                  {activity.activityScore >= 70 ? 'Active' : activity.activityScore >= 40 ? 'Moderately Active' : 'Inactive'}
                </span>
                <p className="text-sm text-gray-600 dark:text-dracula-comment mt-1">Based on recent commits and activity</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 dark:text-dracula-foreground">Last Commit</h3>
            <p className="text-gray-800 dark:text-dracula-foreground">{lastCommitFormatted}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-dracula-currentLine p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-dracula-comment uppercase">Recent Commits</h4>
            <p className="mt-1 text-2xl font-semibold dark:text-dracula-foreground">{activity.recentCommits}</p>
            <p className="text-sm text-gray-600 dark:text-dracula-comment">in the last 30 days</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-dracula-currentLine p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-dracula-comment uppercase">Total Commits</h4>
            <p className="mt-1 text-2xl font-semibold dark:text-dracula-foreground">{activity.totalCommits}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-dracula-currentLine p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-dracula-comment uppercase">Contributors</h4>
            <p className="mt-1 text-2xl font-semibold dark:text-dracula-foreground">{activity.contributors}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2 dark:text-dracula-foreground">Activity Assessment</h3>
          <p className="text-gray-700 dark:text-dracula-foreground dark:text-opacity-90">
            {activity.activityScore >= 70 
              ? 'This repository is actively maintained with regular updates and contributions.'
              : activity.activityScore >= 40
              ? 'This repository has moderate activity. It is being maintained but updates are not frequent.'
              : 'This repository appears to be inactive or minimally maintained. Consider checking if there are more active alternatives.'}
          </p>
        </div>
      </div>
    </section>
  );
} 