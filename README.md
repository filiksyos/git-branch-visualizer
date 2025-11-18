# Git Branch Visualizer

An interactive web application for visualizing Git branches and commit relationships with animation controls and GitHub integration.

![Git Branch Visualizer](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React Flow](https://img.shields.io/badge/React_Flow-12.3-purple)

## Features

### 🎨 Interactive Graph Canvas
- Built with React Flow for smooth, drag-and-drop interactions
- Custom branch and commit nodes with detailed information
- Zoom, pan, and minimap for easy navigation
- Real-time graph manipulation

### 🌿 Branch Visualization
- Visual representation of Git branches as nodes
- Commit relationships shown with animated edges
- Color-coded branches for easy identification
- Hover tooltips with commit details

### ⏯️ Animation & Playback Controls
- Play/pause animation of commit history
- Step-through mode for detailed exploration
- Adjustable playback speed (0.5x to 5x)
- Timeline scrubbing

### 🔗 GitHub Repository Integration
- Load real repositories from GitHub
- Fetch branch and commit data via GitHub API
- Support for public repositories
- Optional GitHub token for higher rate limits

### 📊 Preset & Demo Graphs
- Pre-configured example workflows:
  - Simple Feature Branch
  - Gitflow Workflow
  - Release Workflow with Hotfix
- Learn common Git branching strategies

### 🔍 Branch Filtering & Search
- Real-time branch search
- Multi-select branch filtering
- Focus on specific development lines

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/filiksyos/git-branch-visualizer.git
cd git-branch-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up GitHub token:
```bash
cp .env.example .env
# Edit .env and add your GitHub token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Load a Repository

1. Click "Load Repository" in the header
2. Enter a GitHub repository URL in one of these formats:
   - `owner/repo` (e.g., `facebook/react`)
   - `https://github.com/owner/repo`
3. Click "Load" to fetch and visualize

### Explore with Presets

1. Click "Load Preset Graph" in the sidebar
2. Choose from example workflows
3. Use animation controls to step through the history

### Animation Controls

- **Play/Pause**: Start or stop the animation
- **Step Back/Forward**: Navigate commit by commit
- **Reset**: Return to the beginning
- **Speed**: Adjust playback speed

### Filter Branches

1. Use the search box in the sidebar
2. Click branch names to toggle selection
3. Graph updates to show only selected branches

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript 5.6
- **Graph Library**: React Flow 12.3
- **State Management**: Zustand 5.0
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
git-branch-visualizer/
├── app/                      # Next.js app directory
│   ├── api/github/          # GitHub API integration
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/
│   ├── graph/               # Graph canvas & nodes
│   ├── layout/              # Layout components
│   └── dialogs/             # Modal dialogs
├── lib/
│   ├── store/               # Zustand stores
│   ├── github/              # GitHub client
│   └── graph/               # Graph utilities
├── hooks/                   # Custom React hooks
└── types/                   # TypeScript types
```

## API Rate Limits

GitHub API has rate limits:
- **Without token**: 60 requests/hour
- **With token**: 5,000 requests/hour

For better experience, add a GitHub personal access token to `.env`:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

Create a token at: https://github.com/settings/tokens

## Keyboard Shortcuts

- `Space` - Play/Pause animation
- `←` - Previous step
- `→` - Next step
- `R` - Reset animation

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Acknowledgments

Based on [graph-viz](https://github.com/Blizzeq/graph-viz) by Jakub Krasuski

---

Built with ❤️ using Next.js and React Flow
