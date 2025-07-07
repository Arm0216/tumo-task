import { APIRequestContext, BrowserContext } from '@playwright/test';
import { ApiRequest } from './request.model';
import WebStorage from '@support/apis/webStorage';

export abstract class RequestBuilder {
    private request: ApiRequest;
    private readonly apiContext: APIRequestContext;
    protected readonly API_URL: string;
    private readonly context: BrowserContext;

    protected constructor(apiContext: APIRequestContext, apiUrl: string, context: BrowserContext) {
        this.request = new ApiRequest();
        this.apiContext = apiContext;
        this.API_URL = apiUrl;
        this.context = context;
    }

    protected async authorize(): Promise<this> {
        const webStorage = new WebStorage(this.context);
        const token = await webStorage.getLocalStorage('token');
        this.request.headers = { ...this.request.headers, Authorization: `Bearer ${token}` };
        return this;
    }

    protected method(method: API_METHODS): this {
        this.request.method = method;
        return this;
    }

    protected endpoint(endpoint: string): this {
        this.request.url = `${this.API_URL}${endpoint}`;
        return this;
    }

    protected headers(headers: Record<string, string>): this {
        this.request.headers = { ...this.request.headers, ...headers };
        return this;
    }

    protected data(data: any): this {
        this.request.data = data;
        return this;
    }

    protected queryParams(params: Record<string, string>): this {
        this.request.params = params;
        return this;
    }

    protected reset(): this {
        this.request = new ApiRequest();
        return this;
    }

    protected async build<T>(): Promise<T> {
        const response = await this.apiContext[this.request.method](this.request.url, {
            data: this.request.data,
            headers: this.request.headers,
            params: this.request.params,
        });

        return response.json();
    }
}
