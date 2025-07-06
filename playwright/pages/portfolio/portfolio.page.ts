import { Locator, Page } from '@playwright/test';

class PortfolioPage {
    private readonly page: Page;
    private readonly isMobile: boolean;
    private readonly viewportSize: { width: number; height: number } | null;

    constructor(page: Page) {
        this.page = page;
        this.viewportSize = page.viewportSize();
        this.isMobile = this.viewportSize ? this.viewportSize.width <= 768 : false;
    }

    public async goto(): Promise<void> {
        await this.page.goto('/');
    }

    public getProfileData(): Locator {
        return this.page.locator('[class="profile-data"]');
    }

    public getUserName(): Locator {
        return this.page.locator('h1[class="name"]');
    }

    // Profile locators
    public getProfileImage(): Locator {
        return this.getProfileData().locator('.v-avatar');
    }

    public getEditProfileButton(): Locator {
        return this.page.getByRole('button', { name: 'Edit profile' });
    }

    public getEditProfileModal(): Locator {
        return this.page.locator('.v-card');
    }

    public getEditProfileModalHeader(): Locator {
        return this.getEditProfileModal().locator('header');
    }

    public getEditProfileModalTitle(): Locator {
        return this.getEditProfileModal().getByRole('heading', { name: 'Edit profile' });
    }

    public getEditProfileModalCloseButton(): Locator {
        return this.getEditProfileModalHeader().getByRole('button');
    }

    public getEditProfileModalSection(): Locator {
        return this.getEditProfileModal().locator('[class="section"]');
    }

    public getColorsSection(): Locator {
        return this.getEditProfileModalSection().locator('.colors');
    }

    public getColorsSectionButtons(): Locator {
        return this.getColorsSection().getByRole('button');
    }

    public getColorPickerCanvas(): Locator {
        return this.page.locator('[class="v-color-picker-canvas"]');
    }

    public getColorPicker(): Locator {
        return this.page.locator('[class="v-color-picker-canvas__dot"]');
    }

    public getEditProfileModalLastColorButton(): Locator {
        return this.getColorsSectionButtons().last();
    }

    public getEditProfileModalLastColorButtonSelected(): Locator {
        return this.getEditProfileModalLastColorButton().locator('.material-symbols-rounded');
    }

    //About me locators
    public getAboutMeSection(): Locator {
        return this.getEditProfileModalSection().locator('.bio');
    }

    public getArmenianInput(): Locator {
        return this.getAboutMeSection().getByRole('textbox', { name: 'Armenian' });
    }

    public getEnglishInput(): Locator {
        return this.getAboutMeSection().getByRole('textbox', { name: 'English' });
    }

    public getSaveButton(): Locator {
        return this.getEditProfileModal().getByRole('button', { name: 'Save' });
    }

    public getCancelButton(): Locator {
        return this.getEditProfileModal().getByRole('button', { name: 'Cancel' });
    }
}

export default PortfolioPage;
