import { Page } from "@playwright/test";

class ProjectPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}

export default ProjectPage;