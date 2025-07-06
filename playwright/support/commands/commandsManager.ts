import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import AuthApi from "@builder/apis/auth.api";
import WebStorage from "@builder/webStorage";
import PortfolioPage from "@pages/portfolio/portfolio.page";

class CommandsManager {
    private readonly authApi: AuthApi;
    public readonly webStorage: WebStorage;
    public readonly portfolioPage: PortfolioPage;

    constructor(request: APIRequestContext, context: BrowserContext, page: Page) {
        this.webStorage = new WebStorage(context);
        this.authApi = new AuthApi(request);
        this.portfolioPage = new PortfolioPage(page);
    }

    public async login(username: string, password: string) {
        const response = await this.authApi.login(username, password);
        await this.webStorage.setLocalStorage('token', response.accessToken);

        return response;
    }
}

export default CommandsManager;
