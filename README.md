# Playwright Test Automation Framework

A comprehensive end-to-end test automation framework built with Playwright for testing the TUMO Portfolio application. This framework follows clean code principles, uses the Page Object Model pattern, and provides robust API testing capabilities.

## 🏗️ Architecture Overview

The framework is built with a modular architecture that separates concerns and promotes reusability:

- **Page Object Model (POM)**: Encapsulates page elements and actions
- **Builder Pattern**: For API requests and intercepts
- **Fixture Pattern**: For test data management
- **Abstract Base Classes**: For common functionality

## 📁 Project Structure

```
playwright-task/
├── playwright/
│   ├── fixtures/           # Test data and configuration
│   │   ├── blob/          # Test parameters and data
│   │   ├── config/        # Configuration files
│   │   └── static/        # Static test assets (images, videos, PDFs)
│   ├── pages/             # Page Object Model classes
│   │   ├── basePage.abstract.ts
│   │   └── portfolio/     # Portfolio-specific pages
│   ├── support/           # Support utilities and helpers
│   │   ├── apis/          # API testing framework
│   │   ├── commands/      # Custom commands and fixtures
│   │   ├── helper/        # Utility functions and extensions
│   │   └── types/         # TypeScript type definitions
│   └── tests/             # Test specifications
│       └── e2e/           # End-to-end tests
├── playwright.config.ts   # Playwright configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```
## 🛠️ Setup & Installation

### Prerequisites

- Node.js (LTS version)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd playwright-task
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Install Playwright browsers**

    ```bash
    npx playwright install --with-deps
    ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
    ```env
    BASE_URL=base_url
    AUTH_API='https://portfolio-api.1.tumo.dev'
    USER_NAME=your_username
    PASSWORD=your_password
    ```

## 🎯 Usage

### Running Tests

#### Basic Test Execution

```bash
# Run all tests
npm run test-e2e

# Run with UI mode
npm run test-e2e:ui

# Run in debug mode
npm run test-e2e:debug
```

#### Specific Test Execution

```bash
# Run auth tests with 5 workers
npm run test-e2e:auth

# Run portfolio tests with 1 worker
npm run test-e2e:portfolio

# Run all tests sequentially
npm run test-e2e:all
```

#### Advanced Execution Options

```bash
# Run specific test file
npx playwright test auth.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium

# Run tests with custom workers
npx playwright test --workers=3

# Run tests in headed mode
npx playwright test --headed
```

## 🔄 CI/CD Integration

GitHub Actions workflow (`.github/workflows/playwright.yml`) includes:
Circleci CI/CD (`.circleci/config.yml`) includes:
