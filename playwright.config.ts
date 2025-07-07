import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
    testDir: './playwright/tests',
    timeout: 50000,
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1 : 1,
    reporter: 'html',
    use: {
        video: 'on',
        trace: 'on',
        baseURL: process.env.BASE_URL || 'https://tumo-portfolio.pages.dev',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'opera',
            use: { ...devices['Desktop Opera'] },
        },

        {
            name: 'safari',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
