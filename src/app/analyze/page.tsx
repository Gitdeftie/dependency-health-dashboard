'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AnalyzeForm from '@/components/AnalyzeForm';
import AnalysisResults from '@/components/AnalysisResults';

export default function AnalyzePage() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isGitHubMode, setIsGitHubMode] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if the URL has a type=github parameter
    const type = searchParams.get('type');
    if (type === 'github') {
      setIsGitHubMode(true);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isGitHubMode ? 'GitHub Repository Analysis' : 'Dependency Analysis'}
          </h1>
          <Link href="/" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {isGitHubMode ? 'Repository Selection' : 'Project Selection'}
        </h2>
        <AnalyzeForm onAnalysisComplete={setAnalysisData} />
      </div>

      {analysisData ? (
        <AnalysisResults data={analysisData} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Outdated Packages</h2>
            <p className="text-gray-500 italic mb-4">
              {isGitHubMode 
                ? 'Select a GitHub repository to analyze outdated dependencies' 
                : 'Select a project to analyze outdated dependencies'}
            </p>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">
              {isGitHubMode ? 'Repository Activity' : 'Security Vulnerabilities'}
            </h2>
            <p className="text-gray-500 italic mb-4">
              {isGitHubMode 
                ? 'Select a GitHub repository to check its activity status' 
                : 'Select a project to scan for security vulnerabilities'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 