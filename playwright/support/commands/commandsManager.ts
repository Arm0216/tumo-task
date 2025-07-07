import { APIRequestContext, BrowserContext } from '@playwright/test';
import AuthApi from '@support/apis/builder/request/auth/auth.api';
import WebStorage from '@support/apis/webStorage';

class CommandsManager {
    private readonly authApi: AuthApi;
    private context: BrowserContext;

    constructor(request: APIRequestContext, context: BrowserContext) {
        this.authApi = new AuthApi(request, context);
        this.context = context;
    }

    public webStorage(): WebStorage {
        return new WebStorage(this.context);
    }

    public async login(username: string, password: string): Promise<LOGIN_RESPONSE> {
        const response = await this.authApi.login(username, password);
        await this.webStorage().setLocalStorage('token', response.accessToken);

        return response;
    }
}

export default CommandsManager;
