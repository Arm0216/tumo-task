import { APIRequestContext, BrowserContext } from "@playwright/test";
import { RequestBuilder } from "../request.builder";
import { API_CONFIG } from "@fixtures/config/api.config";
import UsersEndpoint from "@support/apis/endpoints/users.endpoint";

class UsersApi extends RequestBuilder {
    constructor(request: APIRequestContext, context: BrowserContext) {
        super(request, API_CONFIG.AUTH_API, context);
    }

    public async patchUserProfile(data: any): Promise<Response> {
        return (await this.method('patch')
            .endpoint(UsersEndpoint.userProfileEndpoint())
            .data(data)
            .authorize())
            .build<Response>();
    }
}

export default UsersApi;