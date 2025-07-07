import { Page, Response } from '@playwright/test';

abstract class BasePage {
    protected readonly page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    public waitUntilLoaded(): Promise<void> {
        return this.page.waitForLoadState('networkidle', { timeout: 50000 });
    }

    public abstract goTo(): Promise<Response | null>;
}

export default BasePage;
