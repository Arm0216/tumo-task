import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import os from 'os';

const computeWorkers = () => {
    const cpuCount = os.cpus().length;
    // Use 75% of available CPU cores, minimum 2, maximum 6
    return Math.max(2, Math.min(Math.floor(cpuCount * 0.75), 6));
};

export default defineConfig({
    testDir: './playwright/tests',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : computeWorkers(),
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        baseURL: process.env.BASE_URL || 'https://tumo-portfolio.pages.dev',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'safari',
            use: { ...devices['Desktop Safari'] },
        },
    ]
});
