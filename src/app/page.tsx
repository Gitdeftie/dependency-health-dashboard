import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Dependency Health Dashboard</h1>
        <p className="text-xl text-gray-600">
          A powerful tool to analyze and visualize the health of your project dependencies and repository activity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Dependency Analysis</h2>
          <p className="mb-4">Identify outdated packages and security vulnerabilities in your dependencies.</p>
          <Link href="/analyze" className="btn-primary inline-block">
            Analyze Project
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">GitHub Repository Analysis</h2>
          <p className="mb-4">Check if a GitHub repository is actively maintained and analyze its dependencies.</p>
          <Link href="/analyze?type=github" className="btn-primary inline-block">
            Analyze Repository
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">License Compliance</h2>
          <p className="mb-4">Ensure all dependencies comply with your project's license.</p>
          <Link href="/license-check" className="btn-primary inline-block">
            Check Licenses
          </Link>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Scanning</h3>
            <p>We scan your project's package files or GitHub repository</p>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analysis</h3>
            <p>Dependencies and repository activity are analyzed for health indicators</p>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visualization</h3>
            <p>Results are compiled into an interactive dashboard with actionable insights</p>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">New Feature: GitHub Repository Health Check</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="mb-4">
              Our new GitHub repository analysis feature helps you assess both dependency health and project activity status.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Check if a repository is actively maintained</li>
              <li>See recent commit activity and contributor count</li>
              <li>Analyze dependency health and security vulnerabilities</li>
              <li>Get an overall project health score</li>
            </ul>
            <Link href="/analyze?type=github" className="btn-primary inline-block">
              Try GitHub Analysis
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">85</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Activity Score</h4>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Active</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recent Commits:</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contributors:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Commit:</span>
                  <span className="font-medium">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-12 pb-8">
        <p>© 2023 Dependency Health Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
} 