'use client';

import { useState } from 'react';
import { OutdatedPackage, Vulnerability, DependencyUsage, RepositoryActivity as RepoActivity } from '@/lib/analyzer';
import RepositoryActivity from './RepositoryActivity';
import { ChevronDownIcon, ChevronRightIcon } from './Icons';

interface AnalysisResultsProps {
  data: {
    outdated: OutdatedPackage[];
    vulnerabilities: Vulnerability[];
    usage: DependencyUsage[];
    activity?: RepoActivity;
    detectedFiles?: string[];
    error?: string;
  };
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  badge?: {
    text: string;
    color: string;
    darkColor?: string;
  };
  defaultCollapsed?: boolean;
}

function CollapsibleSection({ title, children, badge, defaultCollapsed = true }: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <section className="mb-8 border border-gray-200 dark:border-dracula-currentLine rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center bg-gray-50 dark:bg-dracula-currentLine px-6 py-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-500 dark:text-dracula-comment mr-2" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-dracula-comment mr-2" />
          )}
          <h2 className="text-2xl font-semibold dark:text-dracula-foreground">
            {title}
            {badge && (
              <span className={`ml-2 px-2 py-1 text-sm rounded-full ${badge.color} dark:${badge.darkColor || badge.color}`}>
                {badge.text}
              </span>
            )}
          </h2>
        </div>
        <span className="text-sm text-gray-500 dark:text-dracula-comment">
          {isCollapsed ? 'Click to expand' : 'Click to collapse'}
        </span>
      </div>
      <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[2000px]'}`}>
        <div className="p-6 dark:bg-black">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  if (data.error) {
    return (
      <div className="bg-red-50 dark:bg-opacity-10 border border-red-200 dark:border-dracula-red text-red-700 dark:text-dracula-red px-4 py-3 rounded-md">
        Error: {data.error}
      </div>
    );
  }

  const isGitHubRepo = !!data.activity;

  // Count outdated packages
  const outdatedCount = data.outdated.filter(pkg => pkg.isOutdated).length;

  // Separate used and unused dependencies
  const usedDependencies = data.usage.filter(dep => dep.used);
  const unusedDependencies = data.usage.filter(dep => !dep.used);

  // Combine dependency data with outdated information
  const enhancedUsedDeps = usedDependencies.map(dep => {
    const outdatedInfo = data.outdated.find(pkg => pkg.name === dep.name);
    return {
      ...dep,
      outdated: outdatedInfo || null
    };
  });

  const enhancedUnusedDeps = unusedDependencies.map(dep => {
    const outdatedInfo = data.outdated.find(pkg => pkg.name === dep.name);
    return {
      ...dep,
      outdated: outdatedInfo || null
    };
  });

  // Count outdated packages in each category
  const outdatedUsedCount = enhancedUsedDeps.filter(dep => dep.outdated?.isOutdated).length;
  const outdatedUnusedCount = enhancedUnusedDeps.filter(dep => dep.outdated?.isOutdated).length;

  return (
    <div className="space-y-4">
      {isGitHubRepo && <RepositoryActivity activity={data.activity!} />}

      {data.detectedFiles && data.detectedFiles.length > 0 && (
        <CollapsibleSection 
          title="Detected Dependency Files" 
          defaultCollapsed={false}
        >
          <div className="card dark:bg-dracula-currentLine dark:bg-opacity-30 dark:border-dracula-currentLine">
            <ul className="list-disc pl-5 space-y-1">
              {data.detectedFiles.map((file, index) => (
                <li key={index} className="text-gray-700 dark:text-dracula-foreground">
                  {file}
                </li>
              ))}
            </ul>
            {data.detectedFiles.length > 1 && (
              <p className="mt-4 text-sm text-gray-600 dark:text-dracula-comment">
                Multiple dependency files were detected. Dependencies from all files have been analyzed.
              </p>
            )}
          </div>
        </CollapsibleSection>
      )}

      {enhancedUsedDeps.length > 0 && (
        <CollapsibleSection 
          title="Used Dependencies" 
          badge={{
            text: outdatedUsedCount > 0 ? `${usedDependencies.length} packages (${outdatedUsedCount} outdated)` : `${usedDependencies.length} packages`,
            color: outdatedUsedCount > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800',
            darkColor: outdatedUsedCount > 0 ? 'bg-dracula-orange bg-opacity-20 text-dracula-orange' : 'bg-dracula-green bg-opacity-20 text-dracula-green'
          }}
          defaultCollapsed={false}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dracula-currentLine">
              <thead className="bg-gray-50 dark:bg-dracula-currentLine">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Current Version</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Latest Version</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Import Count</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-dracula-currentLine">
                {enhancedUsedDeps.map((dep) => (
                  <tr key={dep.name} className={dep.outdated?.isOutdated ? 'bg-yellow-50 dark:bg-dracula-orange dark:bg-opacity-10' : 'dark:bg-black'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dracula-foreground">{dep.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dracula-comment">{dep.outdated?.current || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dracula-comment">
                      {!dep.outdated ? 'N/A' : 
                        dep.outdated.latest === 'not found' ? (
                          <span className="text-gray-400 dark:text-dracula-comment">Not found on registry</span>
                        ) : dep.outdated.latest === 'unknown' ? (
                          <span className="text-gray-400 dark:text-dracula-comment">Unknown</span>
                        ) : (
                          dep.outdated.latest
                        )
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!dep.outdated ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-dracula-comment dark:bg-opacity-20 dark:text-dracula-comment">
                          Unknown
                        </span>
                      ) : dep.outdated.isOutdated ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-dracula-orange dark:bg-opacity-20 dark:text-dracula-orange">
                          Outdated
                        </span>
                      ) : dep.outdated.latest === 'unknown' || dep.outdated.latest === 'not found' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-dracula-comment dark:bg-opacity-20 dark:text-dracula-comment">
                          Unknown
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-dracula-green dark:bg-opacity-20 dark:text-dracula-green">
                          Up to date
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dracula-comment">{dep.importCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {outdatedUsedCount > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-dracula-orange dark:bg-opacity-10 border border-yellow-200 dark:border-dracula-orange dark:border-opacity-30 rounded-md">
                <p className="text-yellow-700 dark:text-dracula-orange">
                  <span className="font-semibold">⚠️ {outdatedUsedCount} outdated {outdatedUsedCount === 1 ? 'dependency' : 'dependencies'}</span> found in your actively used packages. 
                  Consider updating these dependencies to improve security and performance.
                </p>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {enhancedUnusedDeps.length > 0 && (
        <CollapsibleSection 
          title="Unused Dependencies" 
          badge={{
            text: `${unusedDependencies.length} packages`,
            color: 'bg-yellow-100 text-yellow-800',
            darkColor: 'bg-dracula-orange bg-opacity-20 text-dracula-orange'
          }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dracula-currentLine">
              <thead className="bg-gray-50 dark:bg-dracula-currentLine">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Current Version</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Latest Version</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dracula-comment uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-dracula-currentLine">
                {enhancedUnusedDeps.map((dep) => (
                  <tr key={dep.name} className={dep.outdated?.isOutdated ? 'bg-yellow-50 dark:bg-dracula-orange dark:bg-opacity-10' : 'bg-red-50 dark:bg-dracula-red dark:bg-opacity-10'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dracula-foreground">{dep.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dracula-comment">{dep.outdated?.current || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dracula-comment">
                      {!dep.outdated ? 'N/A' : 
                        dep.outdated.latest === 'not found' ? (
                          <span className="text-gray-400 dark:text-dracula-comment">Not found on registry</span>
                        ) : dep.outdated.latest === 'unknown' ? (
                          <span className="text-gray-400 dark:text-dracula-comment">Unknown</span>
                        ) : (
                          dep.outdated.latest
                        )
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-dracula-red dark:bg-opacity-20 dark:text-dracula-red">
                        Unused
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-dracula-orange dark:bg-opacity-10 border border-yellow-200 dark:border-dracula-orange dark:border-opacity-30 rounded-md">
              <p className="text-yellow-700 dark:text-dracula-orange">
                <span className="font-semibold">⚠️ These dependencies are declared in your project but don't appear to be imported or used in your code.</span> 
                Consider removing them to reduce your project's size and complexity.
                {outdatedUnusedCount > 0 && ` ${outdatedUnusedCount} of these unused dependencies are also outdated.`}
              </p>
            </div>
          </div>
        </CollapsibleSection>
      )}

      <CollapsibleSection 
        title="Security Vulnerabilities"
        badge={data.vulnerabilities.length > 0 ? {
          text: `${data.vulnerabilities.length} found`,
          color: 'bg-red-100 text-red-800',
          darkColor: 'bg-dracula-red bg-opacity-20 text-dracula-red'
        } : undefined}
      >
        {data.vulnerabilities.length === 0 ? (
          <p className="text-green-600 dark:text-dracula-green">No security vulnerabilities found!</p>
        ) : (
          <div className="space-y-4">
            {data.vulnerabilities.map((vuln) => (
              <div key={`${vuln.name}-${vuln.range}`} className="bg-red-50 dark:bg-dracula-red dark:bg-opacity-10 border border-red-200 dark:border-dracula-red dark:border-opacity-30 rounded-md p-4">
                <h3 className="text-lg font-medium text-red-800 dark:text-dracula-red">{vuln.name}</h3>
                <p className="mt-1 text-red-700 dark:text-dracula-red dark:text-opacity-90">Severity: {vuln.severity}</p>
                <p className="mt-1 text-red-700 dark:text-dracula-red dark:text-opacity-90">Affected versions: {vuln.range}</p>
                {vuln.fixAvailable && (
                  <p className="mt-2 text-green-700 dark:text-dracula-green">
                    Fix available: {typeof vuln.fixAvailable === 'object' ? `Update to ${vuln.fixAvailable.version}` : 'Yes'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {isGitHubRepo && (
        <div className="bg-blue-50 dark:bg-dracula-purple dark:bg-opacity-10 border border-blue-200 dark:border-dracula-purple dark:border-opacity-30 rounded-md p-4 mt-8">
          <h3 className="text-lg font-medium text-blue-800 dark:text-dracula-purple mb-2">Project Health Summary</h3>
          <div className="space-y-2">
            <p className="text-blue-700 dark:text-dracula-purple dark:text-opacity-90">
              {data.activity && data.activity.activityScore >= 70 && data.vulnerabilities.length === 0
                ? '✅ This project is actively maintained and has no known security vulnerabilities.'
                : data.activity && data.activity.activityScore >= 40 && data.vulnerabilities.length === 0
                ? '✓ This project is moderately maintained and has no known security vulnerabilities.'
                : data.activity && data.activity.activityScore < 40 && data.vulnerabilities.length === 0
                ? '⚠️ This project appears to be inactive but has no known security vulnerabilities.'
                : data.activity && data.activity.activityScore >= 40 && data.vulnerabilities.length > 0
                ? '⚠️ This project is maintained but has security vulnerabilities that need attention.'
                : '❌ This project has significant health concerns including inactivity and/or security vulnerabilities.'}
            </p>
            {outdatedCount > 0 && (
              <p className="text-yellow-700 dark:text-dracula-orange">
                ⚠️ This project has {outdatedCount} outdated {outdatedCount === 1 ? 'dependency' : 'dependencies'} that should be updated.
              </p>
            )}
            {unusedDependencies.length > 0 && (
              <p className="text-yellow-700 dark:text-dracula-orange">
                ⚠️ This project has {unusedDependencies.length} unused {unusedDependencies.length === 1 ? 'dependency' : 'dependencies'} that could be removed.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 