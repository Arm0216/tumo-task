import { API_CONFIG } from "@fixtures/config/api.config";
import { APIRequestContext, BrowserContext } from "@playwright/test";
import { RequestBuilder } from "../request.builder";
import ProjectsEndpoint from "@support/apis/endpoints/projects.endpoint";

class ProjectApi extends RequestBuilder {
    constructor(request: APIRequestContext, context: BrowserContext) {
        super(request, API_CONFIG.AUTH_API, context);
    }

    public async patchProjectResult(id: string, status: 'unpublished' | 'published'): Promise<Response> {
        return (await this.method('patch')
            .endpoint(ProjectsEndpoint.projectResultEndpoint(id))
            .data({ status })
            .authorize())
            .build<Response>();
    }
}

export default ProjectApi;