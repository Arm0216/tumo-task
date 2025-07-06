import { APIRequestContext, test as base, Page, BrowserContext } from '@playwright/test';
import CommandsManager from './commandsManager';

type CommandsFixtures = {
    commands: CommandsManager;
};

export const test = base.extend<CommandsFixtures>({
    commands: async ({ request, context }: { request: APIRequestContext, context: BrowserContext }, use: (commands: CommandsManager) => Promise<void>) => {
      await use(new CommandsManager(request, context));
    },
});
