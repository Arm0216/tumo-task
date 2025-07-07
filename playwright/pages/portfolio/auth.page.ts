import { Locator, Page, Response } from '@playwright/test';
import BasePage from '../basePage.abstract';

class AuthPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public goTo(): Promise<Response | null> {
        return this.page.goto('/login');
    }

    public getUsernameInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    public getPasswordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    public getSignInButton(): Locator {
        return this.page.getByRole('button', { name: 'Sign in' });
    }

    public getForgotPasswordButton(): Locator {
        return this.page.getByRole('button', { name: 'Forgot password?' });
    }

    public getErrorMessage(): Locator {
        return this.page.locator('.v-messages__message');
    }

    public getUsernameErrorMessage(): Locator {
        return this.page.locator('#input-2-messages')
    }

    public getPasswordErrorMessage(): Locator {
        return this.page.locator('#input-4-messages');
    }
}

export default AuthPage;
