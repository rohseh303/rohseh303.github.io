# Rohan Sehgal - Portfolio Website

A modern, minimalist portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by jesselee.ca's clean, terminal-inspired design.

## Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Minimalist Design**: Terminal-inspired aesthetic with monospace typography
- **Responsive**: Mobile-friendly design that works on all devices
- **Content Management**: JSON-based content structure for easy updates
- **Search & Filters**: Interactive filtering for experience and projects
- **Blog Ready**: Writing section with dynamic routes for blog posts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This will create a static export in the `out` directory, ready for GitHub Pages deployment.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── experience/        # Experience/work history
│   ├── projects/          # Projects showcase
│   ├── writing/           # Blog/writing section
│   └── misc/              # Miscellaneous content
├── components/            # React components
│   ├── layout/           # Header, Navigation, Footer
│   ├── sections/         # Page sections (Hero, etc.)
│   ├── cards/            # Card components
│   ├── filters/          # Filter components
│   └── ui/               # Reusable UI components
├── content/              # JSON content files
├── lib/                  # Utilities and helpers
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Content Management

All content is stored in JSON files in the `content/` directory:

- `experience.json` - Work experience entries
- `projects.json` - Project showcase
- `about.json` - About page content
- `writing/posts.json` - Blog post metadata

Simply edit these JSON files to update your content.

## Customization

### Colors & Theme

Edit `lib/theme.ts` and `tailwind.config.ts` to customize the color palette and design tokens.

### Typography

The site uses JetBrains Mono by default. To change fonts, update:
- `app/layout.tsx` - Font import
- `styles/globals.css` - CSS variables

### Adding New Pages

1. Create a new directory in `app/`
2. Add `page.tsx` with your content
3. Update `components/layout/Navigation.tsx` to include the new route

## Deployment

### GitHub Pages

1. Build the project: `npm run build`
2. The `out` directory contains the static files
3. Configure GitHub Pages to serve from the `out` directory
4. Or use GitHub Actions for automatic deployment

## License

This project is private and personal.
