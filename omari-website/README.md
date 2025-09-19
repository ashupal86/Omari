# Omari Website

A modern web application built with Vite, React, TypeScript, and Tailwind CSS for generating Linux setup scripts.

## Features

- **Modern Tech Stack**: Built with Vite, React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-friendly interface with clean, modern UI
- **3-Step Wizard**: Easy-to-use interface for selecting distro, desktop environment, and applications
- **Script Generation**: Automatically generates bash scripts for installing selected applications
- **Distro Compatibility**: Shows only compatible applications for selected Linux distributions

## Tech Stack

- **Vite** - Fast build tool and development server
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework (using official Vite plugin)
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ashupal86/omari.git
cd omari/omari-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
omari-website/
├── src/
│   ├── components/          # Reusable React components
│   │   └── Footer.tsx
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   └── GeneratePage.tsx
│   ├── mock/               # Mock data
│   │   └── apps.json
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles with Tailwind imports
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions workflows
│   └── deploy.yml
├── vite.config.ts          # Vite configuration
└── package.json
```

## Tailwind CSS Setup

This project uses the official Tailwind CSS Vite plugin method:

1. **Installation**:
```bash
npm install tailwindcss @tailwindcss/vite
```

2. **Vite Configuration** (`vite.config.ts`):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

3. **CSS Import** (`src/index.css`):
```css
@import "tailwindcss";
```

## Features Overview

### Landing Page
- Hero section with clear value proposition
- Feature highlights with icons
- Supported distributions showcase
- Call-to-action buttons

### Generate Page
- **Step 1**: Select Linux distribution and desktop environment
- **Step 2**: Choose applications from categorized lists
- **Step 3**: Generate and download installation script

### Script Generation
- Automatically generates bash scripts based on selections
- Groups applications by category for better organization
- Includes security warnings and usage instructions
- Supports copy to clipboard and file download

## Deployment

The project is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at the configured GitHub Pages URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/ashupal86/omari)
- [Documentation](https://github.com/ashupal86/omari/tree/main/docs)
- [Report Issues](https://github.com/ashupal86/omari/issues)