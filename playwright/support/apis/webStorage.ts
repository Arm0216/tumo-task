import { BrowserContext } from '@playwright/test';

class WebStorage {
    private readonly context: BrowserContext;

    constructor(context: BrowserContext) {
        this.context = context;
    }

    public async setLocalStorage(key: string, value: string) {
        await this.context.addInitScript(`
            window.localStorage.setItem('${key}', '${value}');
        `);
    }

    public async getLocalStorage(key: string): Promise<string | null> {
        const page = this.context.pages()[0];
        return await page.evaluate(key => window.localStorage.getItem(key), key);
    }
}

export default WebStorage;
