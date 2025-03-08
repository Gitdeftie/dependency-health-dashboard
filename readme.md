# Dependency Health Dashboard

A powerful tool to analyze and visualize the health of your project dependencies and repository activity.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)

## ✨ Features

- **Dependency Outdated Analysis**: Identify packages that need updating
- **Security Vulnerability Scanning**: Detect known security issues in dependencies
- **GitHub Repository Activity Analysis**: Check if a repository is actively maintained
- **Size Analysis**: Find bloated packages contributing to project size
- **License Compliance**: Ensure all dependencies comply with your project's license
- **Usage Statistics**: Identify which dependencies are actively used vs. potentially unused
- **Dark Mode Support**: Toggle between light and dark themes with true black background option

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git (for GitHub repository analysis)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dependency-health-dashboard.git

# Navigate to the project directory
cd dependency-health-dashboard

# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Usage

#### Local Project Analysis
1. Navigate to the "Analyze Project" page
2. Select "Local Project" mode
3. Enter the path to your project
4. Select the package ecosystem (npm or pip)
5. Click "Analyze Dependencies"
6. View the results in the dashboard

#### GitHub Repository Analysis
1. Navigate to the "Analyze Repository" page
2. Select "GitHub Repository" mode
3. Enter the GitHub repository URL (e.g., https://github.com/facebook/react)
4. Select the package ecosystem (npm or pip)
5. Click "Analyze Repository"
6. View both dependency health and repository activity in the dashboard

## 📊 Dashboard Features

The dashboard provides insights into:

- **Outdated Packages**: Shows which packages are outdated and what versions are available
- **Security Vulnerabilities**: Displays security issues in your dependencies
- **Dependency Usage**: Shows which dependencies are being used in your project
- **Repository Activity**: For GitHub repositories, shows commit frequency, contributor count, and activity score
- **Project Health Summary**: Overall assessment of project health based on activity and vulnerabilities

## 🔧 Supported Package Ecosystems

- npm (JavaScript/Node.js)
- pip (Python)
- More coming soon!

## 🔍 How It Works

1. **Scanning**: The tool scans your project's package files or GitHub repository
2. **Analysis**: Dependencies and repository activity are analyzed for health indicators
3. **Visualization**: Results are compiled into an interactive dashboard
4. **Recommendations**: Actionable insights are provided to improve your dependency health

## 🛠️ Technical Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Input Scanner  │────▶│  Analyzer Core  │────▶│ Data Visualizer │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │                 │
                        │  Report Engine  │
                        │                 │
                        └─────────────────┘
```

## 📝 Future Enhancements

- [ ] Add support for Maven (Java) dependencies
- [ ] GitHub Actions integration
- [ ] API for continuous monitoring
- [ ] Browser extension for quick GitHub repo analysis
- [ ] Team collaboration features
- [ ] Enhanced repository activity metrics
- [ ] Historical activity tracking
- [ ] Dependency tree visualization
- [ ] Automated update recommendations
- [ ] Integration with package vulnerability databases

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [NPM Registry](https://www.npmjs.com/)
- [PyPI](https://pypi.org/)
- [Snyk Vulnerability Database](https://snyk.io/vuln)
- [SPDX License List](https://spdx.org/licenses/)
- [GitHub API](https://docs.github.com/en/rest)
- [Dracula Theme](https://draculatheme.com/) - Inspiration for dark mode colors
