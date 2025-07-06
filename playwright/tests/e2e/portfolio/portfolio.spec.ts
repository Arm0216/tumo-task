import { CONFIG } from '@fixtures/blob/config';
import { test } from '../../../support/commands';
import { expect } from '@playwright/test';
import { fakerHY, faker } from '@faker-js/faker';
import HelperUtil from '@support/helper/helper.util';

test.describe('Verify portfolio page functionality', () => {
    test.beforeEach(async ({ commands, portfolioPage }) => {
        await commands.login(CONFIG.USER_NAME, CONFIG.PASSWORD);
        await commands.webStorage.setLocalStorage('locale', 'en');
        await portfolioPage.goto();
    });

    test('Verify edit profile data functionality with valid data', async ({ portfolioPage }) => {
        const armenianText = fakerHY.lorem.words(3);
        const englishText = faker.lorem.words(3);
        const x = faker.number.int({ min: 1, max: 100 });

        await expect(portfolioPage.getProfileData()).toBeVisible();
        await expect(portfolioPage.getUserName()).toBeVisible();
        await expect(portfolioPage.getProfileImage()).toBeVisible();
        await portfolioPage.getEditProfileButton().click();
        await expect(portfolioPage.getEditProfileModal()).toBeVisible();
        await expect(portfolioPage.getEditProfileModalTitle()).toBeVisible();
        await expect(portfolioPage.getEditProfileModalHeader()).toBeVisible();
        const colorButtonsLength: number = await portfolioPage.getColorsSectionButtons().count();

        await expect(portfolioPage.getEditProfileModalCloseButton()).toBeVisible();
        await expect(portfolioPage.getColorsSectionButtons()).toHaveCount(colorButtonsLength);
        await portfolioPage.getColorsSectionButtons().first().click();
        await expect(portfolioPage.getColorPickerCanvas()).toBeVisible();
        await portfolioPage.getColorPickerCanvas().click({ position: { x, y: 0 } });
        await portfolioPage.getColorsSectionButtons().first().click();
        await expect(portfolioPage.getColorPickerCanvas()).toBeHidden();
        await expect(portfolioPage.getColorsSectionButtons()).toHaveCount(colorButtonsLength + 1);
        await expect(portfolioPage.getEditProfileModalLastColorButtonSelected()).toBeVisible();
        await portfolioPage.getArmenianInput().fill(armenianText);
        await portfolioPage.getEnglishInput().fill(englishText);

        const lastColorButtonColor = await portfolioPage
            .getEditProfileModalLastColorButton()
            .getElementStyle('backgroundColor');

        await portfolioPage.getSaveButton().click();
        await expect(portfolioPage.getEditProfileModal()).toBeHidden();

        const profileDataBackgroundColor = await portfolioPage
        .getProfileData()
        .getElementStyle('background');

        expect(profileDataBackgroundColor).toContain(HelperUtil.gbToRgba(lastColorButtonColor, 0.498));
    });
});
