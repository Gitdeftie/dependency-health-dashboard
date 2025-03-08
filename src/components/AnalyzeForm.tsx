'use client';

import { useState } from 'react';

interface AnalyzeFormProps {
  onAnalysisComplete: (data: any) => void;
}

export default function AnalyzeForm({ onAnalysisComplete }: AnalyzeFormProps) {
  const [projectPath, setProjectPath] = useState('');
  const [ecosystem, setEcosystem] = useState('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGitHubUrl, setIsGitHubUrl] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectPath, ecosystem }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze dependencies');
      }

      onAnalysisComplete(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-dracula-red dark:bg-opacity-10 border border-red-200 dark:border-dracula-red dark:border-opacity-30 text-red-700 dark:text-dracula-red px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md transition-colors ${!isGitHubUrl 
            ? 'bg-blue-600 dark:bg-dracula-purple text-white' 
            : 'bg-gray-200 dark:bg-dracula-currentLine text-gray-800 dark:text-dracula-foreground'}`}
          onClick={() => setIsGitHubUrl(false)}
        >
          Local Project
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md transition-colors ${isGitHubUrl 
            ? 'bg-blue-600 dark:bg-dracula-purple text-white' 
            : 'bg-gray-200 dark:bg-dracula-currentLine text-gray-800 dark:text-dracula-foreground'}`}
          onClick={() => setIsGitHubUrl(true)}
        >
          GitHub Repository
        </button>
      </div>
      
      <div>
        <label htmlFor="project-path" className="block text-sm font-medium text-gray-700 dark:text-dracula-foreground mb-1">
          {isGitHubUrl ? 'GitHub Repository URL' : 'Project Path'}
        </label>
        <input
          type="text"
          id="project-path"
          value={projectPath}
          onChange={(e) => setProjectPath(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-dracula-currentLine rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple bg-white dark:bg-dracula-background text-gray-900 dark:text-dracula-foreground"
          placeholder={isGitHubUrl ? 'https://github.com/username/repository' : '/path/to/your/project'}
          required
        />
        {isGitHubUrl && (
          <p className="mt-1 text-sm text-gray-500 dark:text-dracula-comment">
            Example: https://github.com/facebook/react
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="ecosystem" className="block text-sm font-medium text-gray-700 dark:text-dracula-foreground mb-1">
          Package Ecosystem
        </label>
        <select
          id="ecosystem"
          value={ecosystem}
          onChange={(e) => setEcosystem(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-dracula-currentLine rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dracula-purple bg-white dark:bg-dracula-background text-gray-900 dark:text-dracula-foreground"
        >
          <option value="auto">Auto-detect</option>
          <option value="npm">npm (JavaScript/Node.js)</option>
          <option value="pip">pip (Python)</option>
        </select>
        <p className="mt-1 text-sm text-gray-500 dark:text-dracula-comment">
          Auto-detect will try to determine the ecosystem based on the files found in the project.
        </p>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary dark:bg-dracula-purple dark:hover:bg-opacity-80 dark:text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : isGitHubUrl ? 'Analyze Repository' : 'Analyze Dependencies'}
        </button>
      </div>
    </form>
  );
} 