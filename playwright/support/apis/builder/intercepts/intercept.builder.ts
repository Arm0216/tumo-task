import { Page } from "@playwright/test";
import InterceptModel from "./intercept.model";

class interceptBuilder {
    private intercept: InterceptModel;
    private page: Page;

    constructor(page: Page) {
        this.intercept = new InterceptModel();
        this.page = page;
    }
    
    public endpoint(endpoint: string): this {
        this.intercept.endpoint = endpoint;
        return this;
    }

    public method(method: string): this {
        this.intercept.method = method;
        return this;
    }

    public status(status: number): this {
        this.intercept.status = status;
        return this;
    }

    public body(body: any): this {
        this.intercept.body = body;
        return this;
    }

    public build(): Promise<void> {
        return this.page.route(this.intercept.endpoint, route =>
            route.fulfill({
                status: this.intercept.status,
                json: this.intercept.body,
            }),
        );
    }
}

export default interceptBuilder;