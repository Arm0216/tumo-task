import { CONFIG } from '@fixtures/config/config';
import { expect } from '@playwright/test';
import { test } from '@support/commands';
import { faker } from '@faker-js/faker';

test.describe.configure({ mode: 'parallel' });
test.describe('Verify auth page functionality', () => {
    test.beforeEach(async ({ authPage, commands }) => {
        await commands.webStorage().setLocalStorage('locale', 'en');
        await authPage.goTo();
        await authPage.waitUntilLoaded();
    });

    test.describe('Positive tests', () => {
        test('Verify login functionality with valid username and passowrd', async ({
            authPage,
            portfolioPage,
            page,
        }) => {
            await expect(authPage.getUsernameInput()).toBeVisible();
            await expect(authPage.getPasswordInput()).toBeVisible();
            await expect(authPage.getSignInButton()).toBeVisible();
            await expect(authPage.getForgotPasswordButton()).toBeVisible();

            await authPage.getUsernameInput().fill(CONFIG.USER_NAME);
            await authPage.getPasswordInput().fill(CONFIG.PASSWORD);
            await authPage.getSignInButton().click();
            await expect(portfolioPage.getProfile()).toBeVisible();
            expect(page.url()).toEqual(`${CONFIG.BASE_URL}/`);
        });
    });

    test.describe('Negative tests', () => {
        test('Verify login functionality with invalid username and passowrd', async ({ authPage }) => {
            const errorMessage = 'Incorrect username or password. Please try again.';
            const invalidUsername = faker.internet.username();
            const invalidPassword = faker.internet.password();

            await authPage.getUsernameInput().fill(invalidUsername);
            await authPage.getPasswordInput().fill(invalidPassword);
            await authPage.getSignInButton().click();
            await expect(authPage.getErrorMessage()).toHaveText(errorMessage);
        });

        test('Verify login functionality with empty username and passowrd', async ({ authPage }) => {
            const errorMessage = 'Required';

            await authPage.getUsernameInput().fill('');
            await authPage.getPasswordInput().fill('');
            await authPage.getSignInButton().click();
            await expect(authPage.getUsernameErrorMessage()).toHaveText(errorMessage);
            await expect(authPage.getPasswordErrorMessage()).toHaveText(errorMessage);
        });
    });
});
