import { Page } from "@playwright/test";

declare module '@playwright/test' {
    interface Locator {
        getElementStyle(style: keyof CSSStyleDeclaration): Promise<string>;
    }
}

class LocatorExtensions {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    addGetStyleMethod() {
        const LocatorClass = this.page.locator('body').constructor;
    
        if (!(LocatorClass.prototype as any).getElementStyle) {
            LocatorClass.prototype.getElementStyle = async function (style: keyof CSSStyleDeclaration): Promise<string> {
                return await this.evaluate((el: HTMLElement, styleProp: keyof CSSStyleDeclaration) => {
                    const computedStyle = window.getComputedStyle(el);
                    return computedStyle[styleProp] as string;
                }, style);
            };
        }
    }
}

export default LocatorExtensions;
