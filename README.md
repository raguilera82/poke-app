# 🎮 Poke App Monorepo

A collection of Pokemon-related applications built with different frameworks and shared libraries.

## 📦 Project Structure

- 🅰️ `angular-app`: Pokemon application built with Angular with TypeScript
- ⚛️ `react-app`: Pokemon application built with React with TypeScript
- 💚 `vue-app`: Pokemon application built with Vue.js with TypeScript
- 🎨 `ui-lib`: Shared UI components using Lit with JavaScript
- 🛠️ `core-lib`: Core JavaScript utilities and services (deprecated)
- 📘 `core-lib-ts`: TypeScript version of core utilities with TypeScript
- 🧪 `e2e-tests`: End-to-end tests for all applications with Playwright

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 7 or higher (for workspace support)

### Installation

```bash
# Install all dependencies
cd poke-app
npm install
```

## 🏃‍♂️ Running the Applications

### Angular App
```bash
cd packages/angular-app
npm run start
```

### React App
```bash
cd packages/react-app
npm run dev
```

### Vue App
```bash
cd packages/vue-app
npm run dev
```

## 🧪 Testing

### Running E2E Tests
```bash
cd packages/e2e-tests
npm run test:all      # Run tests for all apps
npm run test:angular  # Run Angular tests only
npm run test:react    # Run React tests only
npm run test:vue      # Run Vue tests only
npm run show-report   # View test results
```

### Core Library Tests
```bash
cd packages/core-lib
npm run test
```

## 🛠️ Development Commands

### Code Formatting
```bash
cd poke-app
npm run check  # Format all files using Biome
```
