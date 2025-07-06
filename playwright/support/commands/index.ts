import { APIRequestContext, test as base, Page, BrowserContext } from '@playwright/test';
import CommandsManager from './commandsManager';
import * as Portfolio from '@pages/portfolio';
import LocatorExtensions from '@support/helper/locatorExtensions';


type CommandsFixtures = {
    commands: CommandsManager;
    portfolioPage: Portfolio.PortfolioPage;
    projectPage: Portfolio.ProjectPage;
};

export const test = base.extend<CommandsFixtures>({
    commands: async ({ request, context, page }: { request: APIRequestContext, context: BrowserContext, page: Page }, use: (commands: CommandsManager) => Promise<void>) => {
        await use(new CommandsManager(request, context, page));
    },
    portfolioPage: async ({ page }: { page: Page }, use: (portfolio: Portfolio.PortfolioPage) => Promise<void>) => {
        await use(new Portfolio.PortfolioPage(page));
    },
    projectPage: async ({ page }: { page: Page }, use: (project: Portfolio.ProjectPage) => Promise<void>) => {
        await use(new Portfolio.ProjectPage(page));
    },
    page: async ({ page }: { page: Page }, use: (page: Page) => Promise<void>) => {
        const locatorExtensions: LocatorExtensions = new LocatorExtensions(page);
        locatorExtensions.addGetStyleMethod();
        
        await use(page);
    },
});
