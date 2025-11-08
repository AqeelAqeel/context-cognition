# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code style issues

## Project Architecture

This is a Next.js 16 application using the App Router architecture with TypeScript and Tailwind CSS.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Linting**: ESLint with Next.js configurations

### Project Structure
- `app/` - Main application directory using App Router
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Home page component
  - `globals.css` - Global Tailwind CSS styles
- `public/` - Static assets (SVG icons)
- Configuration files in root directory

### Key Configuration
- TypeScript paths configured with `@/*` alias pointing to project root
- ESLint uses Next.js core-web-vitals and TypeScript configurations
- Tailwind CSS 4 with PostCSS integration
- Font optimization using `next/font/google`

### Development Notes
- Uses React 19.2.0 with Next.js 16.0.1
- App Router pattern with TypeScript
- Dark mode support implemented in styling
- Font variables defined in root layout for consistent typography