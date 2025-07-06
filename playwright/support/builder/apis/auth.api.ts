import { APIRequestContext } from "@playwright/test";
import { API_CONFIG } from "@fixtures/blob/api.config";
import AuthEndpoint from "../endpoints/auth.endpoint";

class AuthApi {
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    public async login(username: string, password: string): Promise<LOGIN_RESPONSE> {
        const apiUrl = `${API_CONFIG.AUTH_API}${AuthEndpoint.loginEndpoint}`;
        const data = {
            username,
            password
        }
        
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const response = await this.request.post(apiUrl, { data,headers });

        return response.json();
    }
}

export default AuthApi;
