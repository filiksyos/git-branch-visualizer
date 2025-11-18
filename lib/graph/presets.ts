import { PresetGraph } from '@/types';

export const presetGraphs: PresetGraph[] = [
  {
    id: 'simple-feature',
    name: 'Simple Feature Branch',
    description: 'Basic workflow with main and a feature branch',
    nodes: [
      {
        id: 'branch-main',
        type: 'branch',
        data: { label: 'main', branch: 'main' },
        position: { x: 200, y: 100 },
      },
      {
        id: 'branch-feature',
        type: 'branch',
        data: { label: 'feature/login', branch: 'feature/login' },
        position: { x: 500, y: 100 },
      },
      {
        id: 'commit-1',
        type: 'commit',
        data: { label: 'Initial commit', message: 'Initial commit' },
        position: { x: 200, y: 250 },
      },
      {
        id: 'commit-2',
        type: 'commit',
        data: { label: 'Add login form', message: 'Add login form' },
        position: { x: 500, y: 250 },
      },
      {
        id: 'commit-3',
        type: 'commit',
        data: { label: 'Merge feature', message: 'Merge feature/login' },
        position: { x: 350, y: 400 },
      },
    ],
    edges: [
      { id: 'e1', source: 'branch-main', target: 'commit-1' },
      { id: 'e2', source: 'commit-1', target: 'branch-feature' },
      { id: 'e3', source: 'branch-feature', target: 'commit-2' },
      { id: 'e4', source: 'commit-1', target: 'commit-3', animated: true },
      { id: 'e5', source: 'commit-2', target: 'commit-3', animated: true },
    ],
  },
  {
    id: 'gitflow',
    name: 'Gitflow Workflow',
    description: 'Common gitflow with main, develop, and feature branches',
    nodes: [
      {
        id: 'branch-main',
        type: 'branch',
        data: { label: 'main', branch: 'main' },
        position: { x: 100, y: 50 },
      },
      {
        id: 'branch-develop',
        type: 'branch',
        data: { label: 'develop', branch: 'develop' },
        position: { x: 400, y: 50 },
      },
      {
        id: 'branch-feature',
        type: 'branch',
        data: { label: 'feature/api', branch: 'feature/api' },
        position: { x: 700, y: 50 },
      },
      {
        id: 'commit-1',
        type: 'commit',
        data: { label: 'v1.0.0 release', message: 'Release v1.0.0' },
        position: { x: 100, y: 200 },
      },
      {
        id: 'commit-2',
        type: 'commit',
        data: { label: 'Start develop', message: 'Start development' },
        position: { x: 400, y: 200 },
      },
      {
        id: 'commit-3',
        type: 'commit',
        data: { label: 'Build API', message: 'Implement REST API' },
        position: { x: 700, y: 200 },
      },
    ],
    edges: [
      { id: 'e1', source: 'branch-main', target: 'commit-1' },
      { id: 'e2', source: 'branch-develop', target: 'commit-2' },
      { id: 'e3', source: 'commit-2', target: 'branch-feature' },
      { id: 'e4', source: 'branch-feature', target: 'commit-3' },
    ],
  },
  {
    id: 'release',
    name: 'Release Workflow',
    description: 'Production release with hotfix',
    nodes: [
      {
        id: 'branch-main',
        type: 'branch',
        data: { label: 'main', branch: 'main' },
        position: { x: 200, y: 50 },
      },
      {
        id: 'branch-release',
        type: 'branch',
        data: { label: 'release/v2.0', branch: 'release/v2.0' },
        position: { x: 500, y: 50 },
      },
      {
        id: 'branch-hotfix',
        type: 'branch',
        data: { label: 'hotfix/security', branch: 'hotfix/security' },
        position: { x: 800, y: 50 },
      },
      {
        id: 'commit-1',
        type: 'commit',
        data: { label: 'v1.5.0', message: 'Release v1.5.0' },
        position: { x: 200, y: 200 },
      },
      {
        id: 'commit-2',
        type: 'commit',
        data: { label: 'Prepare v2.0', message: 'Prepare version 2.0' },
        position: { x: 500, y: 200 },
      },
      {
        id: 'commit-3',
        type: 'commit',
        data: { label: 'Fix vulnerability', message: 'Fix security issue' },
        position: { x: 800, y: 200 },
      },
    ],
    edges: [
      { id: 'e1', source: 'branch-main', target: 'commit-1' },
      { id: 'e2', source: 'commit-1', target: 'branch-release' },
      { id: 'e3', source: 'branch-release', target: 'commit-2' },
      { id: 'e4', source: 'commit-1', target: 'branch-hotfix' },
      { id: 'e5', source: 'branch-hotfix', target: 'commit-3' },
    ],
  },
];
