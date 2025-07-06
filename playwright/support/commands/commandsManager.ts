import { APIRequestContext, BrowserContext } from "@playwright/test";
import AuthApi from "@/builder/apis/auth.api";
import WebStorage from "@/builder/webStorage";

class CommandsManager {
    private readonly authApi: AuthApi;
    public readonly webStorage: WebStorage;

    constructor(request: APIRequestContext, context: BrowserContext) {
        this.webStorage = new WebStorage(context);
        this.authApi = new AuthApi(request);
    }

    public async login(username: string, password: string) {
        const response = await this.authApi.login(username, password);
        await this.webStorage.setLocalStorage('token', response.accessToken);

        return response;
    }
}

export default CommandsManager;
