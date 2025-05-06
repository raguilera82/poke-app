# 🎮 Poke App Monorepo

A collection of Pokemon-related applications built with different frameworks and shared libraries.

## 📦 Project Structure

- 🅰️ `angular-app`: Pokemon application built with Angular with TypeScript
- ⚛️ `react-app`: Pokemon application built with React with TypeScript
- 💚 `vue-app`: Pokemon application built with Vue.js with TypeScript
- 🔥 `lit-app`: Pokemon application built with Lit with TypeScript
- 🎨 `ui-lib`: Shared UI components using Lit with JavaScript
- 🛠️ `core-lib`: Core JavaScript utilities and services (deprecated)
- 📘 `core-lib-ts`: TypeScript version of core utilities with TypeScript
- 🧪 `e2e-tests`: End-to-end tests for all applications with Playwright

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 7 or higher (for workspace support)

### Installation all dependencies

```bash
cd poke-app
npm install
```

## 🏃‍♂️ Running the Applications (One single command)
```bash
npm run up
```

## 🏃‍♂️ Running the Applications (Individual)

### Angular App
```bash
npm run angular #port=9100
```

### React App
```bash
npm run react #port=9101
```

### Vue App
```bash
npm run vue #port=9102
```

### Lit App
```bash
npm run lit #port=9103
```

## 🧪 Testing

### Running E2E Tests (All with one command)
```bash
npm run test:e2e
```

### Running E2E Tests (Individual)
Note: All apps are running
```bash
cd packages/e2e-tests
npm run test:all      # Run tests for all apps
npm run test:angular  # Run Angular tests only
npm run test:react    # Run React tests only
npm run test:vue      # Run Vue tests only
npm run test:lit      # Run Lit tests only
npm run show-report   # View test results
```

### Core Library Tests
```bash
npm run test
```

## 🛠️ Development Commands

### Code Formatting
```bash
npm run check  # Format all files using Biome
```
