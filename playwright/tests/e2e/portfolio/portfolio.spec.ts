import { CONFIG } from '@fixtures/config/config';
import { test } from '@support/commands';
import { expect } from '@playwright/test';
import { fakerHY, faker } from '@faker-js/faker';
import HelperUtil from '@support/helper/helper.util';
import ProjectsEndpoint from '@support/apis/endpoints/projects.endpoint';
import ProjectApi from '@support/apis/builder/request/projects/project.api';
import FilesEndpoints from '@support/apis/endpoints/files.endpoints';
import { INVALID_FILE_TYPES } from '@fixtures/blob/testParams';
import UsersEndpoint from '@support/apis/endpoints/users.endpoint';
import UsersApi from '@support/apis/builder/request/users/users.api';

test.describe('Verify portfolio page functionality', () => {
    test.beforeEach(async ({ commands, portfolioPage, request, context }) => {
        await commands.login(CONFIG.USER_NAME, CONFIG.PASSWORD);
        await commands.webStorage().setLocalStorage('locale', 'en');

        await portfolioPage.goTo();
        const userProfileApi = new UsersApi(request, context);
        await userProfileApi.patchUserProfile({ profilePicture: "" });
        await portfolioPage.waitUntilLoaded();
    });

    test.describe('Positive tests', () => {
        let deletePostId: string | null;
        test('Verify edit profile data functionality with valid data', async ({ portfolioPage }) => {
            const armenianText = fakerHY.lorem.words(3);
            const englishText = faker.lorem.words(3);
            const x = faker.number.int({ min: 1, max: 100 });
            const y = faker.number.int({ min: 1, max: 100 });

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
            await portfolioPage.getColorPickerCanvas().click({ position: { x, y } });
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

            const profileDataBackgroundColor = await portfolioPage.getProfileData().getElementStyle('background');

            expect(profileDataBackgroundColor).toContain(HelperUtil.gbToRgba(lastColorButtonColor, 0.498));
            expect(await portfolioPage.getBio()).toContainText(englishText);
        });

        test('Verify cancel edit profile data functionality', async ({ portfolioPage }) => {
            const armenianText = fakerHY.lorem.words(3);
            const englishText = faker.lorem.words(3);

            await expect(portfolioPage.getProfileData()).toBeVisible();
            await expect(portfolioPage.getUserName()).toBeVisible();
            await expect(portfolioPage.getProfileImage()).toBeVisible();
            await portfolioPage.getEditProfileButton().click();
            await expect(portfolioPage.getEditProfileModal()).toBeVisible();
            await expect(portfolioPage.getEditProfileModalTitle()).toBeVisible();
            await expect(portfolioPage.getEditProfileModalHeader()).toBeVisible();

            await portfolioPage.getArmenianInput().fill(armenianText);
            await portfolioPage.getEnglishInput().fill(englishText);

            await portfolioPage.getCancelButton().click();
            await expect(portfolioPage.getEditProfileModal()).toBeHidden();

            expect(await portfolioPage.getProfileData()).not.toContainText(englishText);
        });

        test('Verify drag and drop posts functionality', async ({ portfolioPage, page }) => {
            const publishedProjectsWaitForResponse = page.waitForResponse(
                `**${ProjectsEndpoint.publishProjectEndpoint('*')}`,
            );
            await page.reload();
            await portfolioPage.waitUntilLoaded();
            const publishedProjectsResponse = await publishedProjectsWaitForResponse;
            const publishedProjectsResponseJson = await publishedProjectsResponse.json();

            await expect(portfolioPage.getPostsModal()).toBeVisible();
            await portfolioPage.getPosts().first().hover();
            await page.mouse.down();
            await portfolioPage.getPosts().last().hover();
            const box = await portfolioPage.getPostsModal().boundingBox();
            await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
            const sortResponsePromise = page.waitForResponse(`**${ProjectsEndpoint.sortEndpoint}`);
            await expect(portfolioPage.getPosts().first()).not.toHaveClass(['post-chosen', 'post-ghost']);
            await page.waitForTimeout(500);
            await page.mouse.up();
            const sortResponse = await sortResponsePromise;
            const sortResponseJson = await sortResponse.request().postDataJSON();
            const firstPostId = sortResponseJson?.projectsOrder[0];
            expect(firstPostId).not.toEqual(publishedProjectsResponseJson.projects[0].id);
        });

        test('Verify archive functionality', async ({ portfolioPage, page }) => {
            const archiveWaitForResponse = page.waitForResponse(`**${ProjectsEndpoint.projectResultEndpoint('*')}`);
            await expect(portfolioPage.getPostArchive().first()).toBeVisible();
            await portfolioPage.getPostArchive().first().click();
            const archiveResponse = await archiveWaitForResponse;
            deletePostId = archiveResponse.url().split('/').pop()!;
            await expect(portfolioPage.getGroupTypeArchive()).toBeVisible();
            const unpublishedProjectsWaitForResponse = page.waitForResponse(
                `**${ProjectsEndpoint.unpublishedProjectsEndpoint('*')}`,
            );
            await portfolioPage.getGroupTypeArchive().click();
            await unpublishedProjectsWaitForResponse;
            await expect(portfolioPage.getPostsModal()).toBeVisible();
            const countOfUnpublishedProjects = await portfolioPage.getPosts().count();
            await expect(countOfUnpublishedProjects).toBeGreaterThan(0);
        });

        test('Verify publish functionality', async ({ portfolioPage, page, request, context }) => {
            const publishWaitForResponse = page.waitForResponse(`**${ProjectsEndpoint.publishProjectEndpoint('*')}`);
            await page.reload();
            await portfolioPage.waitUntilLoaded();
            const projectApi = new ProjectApi(request, context);
            const publishResponse = await publishWaitForResponse;
            const publishResponseJson = await publishResponse.json();
            const firstPostId = publishResponseJson.projects[0].id;

            const unpublishedProjectsWaitForResponse = page.waitForResponse(
                `**${ProjectsEndpoint.unpublishedProjectsEndpoint('*')}`,
            );
            const countOfPublishedProjects = await portfolioPage.getPosts().count();
            await projectApi.patchProjectResult(firstPostId, 'unpublished');
            await portfolioPage.getGroupTypeArchive().click();
            await unpublishedProjectsWaitForResponse;
            await expect(portfolioPage.getPostsModal()).toBeVisible();
            const countOfUnpublishedProjects = await portfolioPage.getPosts().count();
            await expect(countOfUnpublishedProjects).toBeGreaterThan(0);
            const publishedProjectsWaitForResponse = page.waitForResponse(
                `**${ProjectsEndpoint.projectResultEndpoint('*')}`,
            );
            await portfolioPage.getPostPublish().first().click();
            await publishedProjectsWaitForResponse;
            const countOfUnpublishedProjectsAfterPublish = await portfolioPage.getPosts().count();
            await expect(countOfUnpublishedProjectsAfterPublish).toBeLessThan(countOfUnpublishedProjects);
            await portfolioPage.getGroupTypePublish().click();
            const countOfPublishedProjectsAfterPublish = await portfolioPage.getPosts().count();
            await expect(countOfPublishedProjectsAfterPublish).toEqual(countOfPublishedProjects);
        });

        test('Verify edit thumbnail upload functionality', async ({ portfolioPage, page }) => {
            const fileEndpointWaitForResponse = page.waitForResponse(`**${FilesEndpoints.fileEndpoint('**')}`);

            await expect(portfolioPage.getPostEditThumbnail().first()).toBeVisible();
            await portfolioPage.getPostEditThumbnail().first().click();
            await expect(portfolioPage.getEditThumbnailModal()).toBeVisible();
            await expect(portfolioPage.getUploadThumbnailButton()).toBeVisible();
            const fileChooserPromise = page.waitForEvent('filechooser');
            await portfolioPage.getUploadThumbnailButton().click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(HelperUtil.getStaticFilePath('test.png'));
            await expect(portfolioPage.getThumbnailSaveButton()).toBeVisible();
            await portfolioPage.getThumbnailSaveButton().click();
            await fileEndpointWaitForResponse;
            await expect(portfolioPage.getEditThumbnailModal()).toBeHidden();
            await expect(portfolioPage.getPostEditThumbnail().first()).toBeVisible();
        });

        test('Verify cancel button functionality in edit thumbnail upload modal', async ({ portfolioPage, page }) => {
            await expect(portfolioPage.getPostEditThumbnail().first()).toBeVisible();
            await portfolioPage.getPostEditThumbnail().first().click();
            await expect(portfolioPage.getEditThumbnailModal()).toBeVisible();
            await expect(portfolioPage.getUploadThumbnailButton()).toBeVisible();
            const fileChooserPromise = page.waitForEvent('filechooser');
            await portfolioPage.getUploadThumbnailButton().click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(HelperUtil.getStaticFilePath('test.png'));
            await expect(portfolioPage.getThumbnailCancelButton()).toBeVisible();
            await portfolioPage.getThumbnailCancelButton().click();
            await expect(portfolioPage.getEditThumbnailModal()).toBeHidden();
        });

        test(`Verify upload profile image functionality with valid file format`, async ({
            portfolioPage,
            page,
        }) => {
            await expect(portfolioPage.getProfileImage()).toBeVisible();
            await portfolioPage.getProfileImage().hover();
            await portfolioPage.getUploadProfileImageButton().click();
            await expect(portfolioPage.getEditProfileModal()).toBeVisible();
            await expect(portfolioPage.getUploadPhotoButton()).toBeVisible();
            const fileChooserPromise = page.waitForEvent('filechooser');
            await portfolioPage.getUploadPhotoButton().click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(HelperUtil.getStaticFilePath(`test.png`));
            const userProfileApiWaitForResponse = page.waitForResponse(`**${UsersEndpoint.userProfileEndpoint()}`);
            await portfolioPage.getSaveButton().click();
            await userProfileApiWaitForResponse;
            await expect(portfolioPage.getEditProfileModal()).toBeHidden();
            await page.reload();
            await portfolioPage.waitUntilLoaded();
            await expect(portfolioPage.getEditProfileImage()).toBeVisible({ timeout: 10000 });
        });

        test.afterEach(async ({ request, context }) => {
            if (deletePostId) {
                const projectApi = new ProjectApi(request, context);
                await projectApi.patchProjectResult(deletePostId, 'published');
                deletePostId = null;
            }
        });
    });

    test.describe('Negative tests', () => {
        //TODO: Expect error message is missing. It's bug
        test.skip('Verify edit thumbnail upload functionality with invalid file format', async ({
            portfolioPage,
            page,
        }) => {
            await expect(portfolioPage.getPostEditThumbnail().first()).toBeVisible();
            await portfolioPage.getPostEditThumbnail().first().click();
            await expect(portfolioPage.getEditThumbnailModal()).toBeVisible();
            await expect(portfolioPage.getUploadThumbnailButton()).toBeVisible();
            const fileChooserPromise = page.waitForEvent('filechooser');
            await portfolioPage.getUploadThumbnailButton().click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(HelperUtil.getStaticFilePath('test.mp4'));
        });

        INVALID_FILE_TYPES.forEach(fileType => {
            test(`Verify upload profile image functionality with invalid file format ${fileType}`, async ({
                portfolioPage,
                page,
            }) => {
                const warningText = 'You can only upload a picture';

                await expect(portfolioPage.getProfileImage()).toBeVisible();
                await portfolioPage.getProfileImage().hover();
                await portfolioPage.getUploadProfileImageButton().click();
                await expect(portfolioPage.getEditProfileModal()).toBeVisible();
                await expect(portfolioPage.getUploadPhotoButton()).toBeVisible();
                const fileChooserPromise = page.waitForEvent('filechooser');
                await portfolioPage.getUploadPhotoButton().click();
                const fileChooser = await fileChooserPromise;
                await fileChooser.setFiles(HelperUtil.getStaticFilePath(`test.${fileType}`));
                await expect(portfolioPage.getUploadWarningText()).toHaveText(warningText);
            });
        });
    });
});
