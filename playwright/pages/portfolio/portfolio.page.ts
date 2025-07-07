import { Locator, Page, Response } from '@playwright/test';
import BasePage from '../basePage.abstract';

class PortfolioPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public goTo(): Promise<Response | null> {
        return this.page.goto('/');
    }

    public getProfileData(): Locator {
        return this.page.locator('[class="profile-data"]');
    }

    public getProfile(): Locator {
        return this.page.locator('.profile');
    }

    public getEditProfileImage(): Locator {
        return this.getProfile().locator('img');
    }

    public getUserName(): Locator {
        return this.page.locator('h1[class="name"]');
    }

    public getBio(): Locator {
        return this.page.locator('p[class="bio"]');
    }

    public getPostsModal(): Locator {
        return this.page.locator('[class="posts"]');
    }

    public getPosts(): Locator {
        return this.page.locator('[class="posts"] article');
    }

    public getPostContent(): Locator {
        return this.getPosts().locator('div[class="content"]');
    }

    public getPostArchive(): Locator {
        return this.getPosts().getByRole('button', { name: 'Archive' });
    }

    public getPostPublish(): Locator {
        return this.getPosts().getByRole('button', { name: 'Publish' });
    }

    public getPostEditThumbnail(): Locator {
        return this.getPosts().getByRole('button', { name: 'Edit thumbnail' });
    }

    public getEditThumbnailModal(): Locator {
        return this.page.locator('.v-overlay__content .v-card');
    }

    public getUploadThumbnailButton(): Locator {
        return this.getEditThumbnailModal().getByRole('button', { name: 'Upload' });
    }

    public getThumbnailSaveButton(): Locator {
        return this.getEditThumbnailModal().getByRole('button', { name: 'Save' });
    }

    public getThumbnailCancelButton(): Locator {
        return this.getEditThumbnailModal().getByRole('button', { name: 'Cancel' });
    }

    public getGroupTypes(): Locator {
        return this.page.locator('.buttons .v-slide-group');
    }

    public getGroupTypeArchive(): Locator {
        return this.getGroupTypes().locator('#unpublished-projects');
    }

    public getGroupTypePublish(): Locator {
        return this.getGroupTypes().locator('#published-projects');
    }

    // Profile locators
    public getProfileImage(): Locator {
        return this.getProfileData().locator('.v-avatar');
    }

    public getUploadProfileImageButton(): Locator {
        return this.getProfileImage().locator('.v-overlay');
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

    public getUploadPhotoButton(): Locator {
        return this.getEditProfileModal().getByRole('button', { name: 'Upload photo' });
    }

    public getUploadWarningText(): Locator {
        return this.getEditProfileModal().locator('.upload-warning-text');
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

    public getCroperSlider(): Locator {
        return this.getEditProfileModal().locator('.v-input--horizontal');
    }
}

export default PortfolioPage;
