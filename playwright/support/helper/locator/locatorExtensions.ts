import { Page, Locator } from '@playwright/test';
import { LocatorPrototypeExtension } from './locatorPrototype.abstract';

declare module '@playwright/test' {
    interface Locator {
        getElementStyle(style: keyof CSSStyleDeclaration): Promise<string>;
    }
}

class LocatorExtensions extends LocatorPrototypeExtension {
    constructor(page: Page) {
        super(page);
    }

    public extendPrototype(): void {
        this.addMethodToPrototype('getElementStyle', this.getStyleMethod);
    }

    private async getStyleMethod(this: Locator, style: keyof CSSStyleDeclaration): Promise<string> {
        return await this.evaluate((el: HTMLElement, styleProp: keyof CSSStyleDeclaration) => {
            const computedStyle = window.getComputedStyle(el);
            return computedStyle[styleProp] as string;
        }, style);
    };
}

export default LocatorExtensions;
