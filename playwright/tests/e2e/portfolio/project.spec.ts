import { CONFIG } from "@fixtures/blob/config";
import { test } from "../../../support/commands";
import PortfolioPage from "@pages/portfolio/portfolio.page";
import { expect } from "@playwright/test";
import { fakerHY, faker } from "@faker-js/faker";

test.describe('Verify portfolio page functionality', () => {
    let portfolioPage: PortfolioPage;

    test.beforeEach(async ({ commands, page }) => {
        portfolioPage = new PortfolioPage(page);

        await commands.login(CONFIG.USER_NAME, CONFIG.PASSWORD);
        await commands.webStorage.setLocalStorage('locale', 'en');
        await portfolioPage.goto();
    });

    test('Verify edit profile data functionality with valid data', async () => {
        const armenianText = fakerHY.lorem.words(3);
        const englishText = faker.lorem.words(3);

        await expect(portfolioPage.getProfileData()).toBeVisible();
        await expect(portfolioPage.getUserName()).toBeVisible();
        await expect(portfolioPage.getProfileImage()).toBeVisible();
        await portfolioPage.getEditProfileButton().click();
        await expect(portfolioPage.getEditProfileModal()).toBeVisible();
        await expect(portfolioPage.getEditProfileModalTitle()).toBeVisible();
        await expect(portfolioPage.getEditProfileModalHeader()).toBeVisible();
        const colorButtonsLength: number = await portfolioPage.getColorsSectionButtons().count();

        // await expect(portfolioPage.getEditProfileModalCloseButton()).toBeVisible();
        await expect(portfolioPage.getColorsSectionButtons()).toHaveCount(colorButtonsLength);
        await portfolioPage.getColorsSectionButtons().first().click();
        await expect(portfolioPage.getColorPickerCanvas()).toBeVisible();
        await portfolioPage.getColorPickerCanvas().click({ position: { x: 100, y: 0 } });
        await portfolioPage.getColorsSectionButtons().first().click();
        await expect(portfolioPage.getColorsSectionButtons()).toHaveCount(colorButtonsLength + 1);  
        await expect(portfolioPage.getEditProfileModalLastColorButtonSelected()).toBeVisible();
        await portfolioPage.getArmenianInput().fill(armenianText);
        await portfolioPage.getEnglishInput().fill(englishText);
        await portfolioPage.getSaveButton().click();
        await expect(portfolioPage.getEditProfileModal()).not.toBeVisible();
    });
});
