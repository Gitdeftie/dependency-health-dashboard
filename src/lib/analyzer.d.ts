declare module '@/lib/analyzer' {
  export interface OutdatedPackage {
    name: string;
    current: string;
    wanted: string;
    latest: string;
    type: 'dependency' | 'devDependency';
    isOutdated?: boolean;
  }

  export interface Vulnerability {
    name: string;
    severity: string;
    via: any[];
    effects: string[];
    range: string;
    nodes: string[];
    fixAvailable: boolean | { name: string; version: string; isSemVerMajor: boolean };
  }

  export interface DependencyUsage {
    name: string;
    used: boolean;
    importCount: number;
  }

  export interface RepositoryActivity {
    lastCommitDate: string;
    recentCommits: number;
    totalCommits: number;
    contributors: number;
    openIssues: string | number;
    isActive: boolean;
    activityScore: number;
    error?: string;
  }

  export interface AnalysisResult {
    error?: string;
    outdated: OutdatedPackage[];
    vulnerabilities: Vulnerability[];
    usage: DependencyUsage[];
    activity?: RepositoryActivity;
    detectedFiles: string[];
  }

  export function analyzeDependencies(
    projectPath: string,
    ecosystem?: 'npm' | 'pip' | 'auto'
  ): Promise<AnalysisResult>;
} 