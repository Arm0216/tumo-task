import { APIRequestContext, BrowserContext } from '@playwright/test';
import AuthEndpoint from '../../../endpoints/auth.endpoint';
import { RequestBuilder } from '../request.builder';
import { API_CONFIG } from '@fixtures/config/api.config';

class AuthApi extends RequestBuilder {
    constructor(request: APIRequestContext, context: BrowserContext) {
        super(request, API_CONFIG.AUTH_API, context);
    }

    public async login(username: string, password: string): Promise<LOGIN_RESPONSE> {
        return this.method('post')
            .endpoint(AuthEndpoint.loginEndpoint)
            .data({ username, password })
            .build<LOGIN_RESPONSE>();
    }
}

export default AuthApi;
