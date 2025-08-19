import { expect } from '@playwright/test';
import { test } from './index.js';

test('home page has the right first user', async ({ page, db, schema }) => {
	const first_user = await db.select().from(schema.user).limit(1).get();
	await page.goto('/');
	await expect(page.locator('li').first()).toHaveText(`${first_user?.id} - ${first_user?.name}`);
});

test.describe('empty database', () => {
	test.use({
		seed: {
			user: []
		}
	});

	test('home page has no users', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('li')).toHaveCount(0);
	});
});

test.describe('one specific user', () => {
	test.use({
		seed: {
			user: [
				{
					id: 1,
					name: 'Paolo Ricciuti'
				}
			]
		}
	});

	test('home page has a single user', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('li')).toHaveText(`1 - Paolo Ricciuti`);
	});
});
