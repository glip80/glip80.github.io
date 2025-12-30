# Alexander Polyakov - Developer Profile

This repository hosts the personal developer portfolio website for Alexander Polyakov (@glip80), built with React, TypeScript, and Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (Included with Node.js)

## Getting Started

Follow these steps to set up the project locally.

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

Start the local development server with hot-reload:

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

### 3. Build for Production

Build the project for deployment:

```bash
npm run build
```

The output will be in the `dist` directory.

### 4. Preview Production Build

To locally preview the production build:

```bash
npm run preview
```

Visit `http://localhost:4173` to view the production build.

## VS Code Configuration

This project includes VS Code configurations for a smoother development experience.

- **Launch Preview**: You can use the "Run and Debug" side bar to launch the preview server and open it in Chrome automatically. This requires the project to be built first (`npm run build`).

## Deployment

This project is configured to deploy to **GitHub Pages** using GitHub Actions.

For detailed instructions on domain configuration and deployment verification, please refer to the [Deployment Guide](deployment_guide.md).
