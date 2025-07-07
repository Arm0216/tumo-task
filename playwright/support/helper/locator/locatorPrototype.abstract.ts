import { Page } from '@playwright/test';

export abstract class LocatorPrototypeExtension {
    protected readonly page: Page;
    protected readonly Locator: any;

    constructor(page: Page) {
        this.page = page;
        this.Locator = this.page.locator('body').constructor;
    }

    protected addMethodToPrototype(methodName: string, method: Function): void {
        if (!(this.Locator.prototype as any)[methodName]) {
            this.Locator.prototype[methodName] = method;
        }
    }

    abstract extendPrototype(): void;
}
