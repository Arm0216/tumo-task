import { APIRequestContext, test as base, Page, BrowserContext } from '@playwright/test';
import CommandsManager from './commandsManager';
import * as Portfolio from '@pages/portfolio';
import LocatorExtensions from '@support/helper/locator/locatorExtensions';

type CommandsFixtures = {
    commands: CommandsManager;
    portfolioPage: Portfolio.PortfolioPage;
    authPage: Portfolio.AuthPage;
};

export const test = base.extend<CommandsFixtures>({
    commands: async (
        { request, context }: { request: APIRequestContext; context: BrowserContext; page: Page },
        use: (commands: CommandsManager) => Promise<void>,
    ) => {
        await use(new CommandsManager(request, context));
    },

    portfolioPage: async ({ page }: { page: Page }, use: (portfolio: Portfolio.PortfolioPage) => Promise<void>) => {
        await use(new Portfolio.PortfolioPage(page));
    },

    authPage: async ({ page }: { page: Page }, use: (auth: Portfolio.AuthPage) => Promise<void>) => {
        await use(new Portfolio.AuthPage(page));
    },

    page: async ({ page }: { page: Page }, use: (page: Page) => Promise<void>) => {
        const locatorExtensions: LocatorExtensions = new LocatorExtensions(page);
        locatorExtensions.extendPrototype();

        await use(page);
    },
});
