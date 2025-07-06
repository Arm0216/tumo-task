import { BrowserContext } from "@playwright/test";

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

    public async getLocalStorage(key: string) {
        return await this.context.addInitScript(`
            window.localStorage.getItem('${key}');
        `);
    }
}

export default WebStorage;