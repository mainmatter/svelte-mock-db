/* eslint-disable no-empty-pattern */
import { test as base } from '@playwright/test';
import { db } from '../src/lib/server/db/index.js';
import * as schema from '../src/lib/server/db/schema.js';
import { reset, seed } from 'drizzle-seed';

export const test = base.extend<{
	db: typeof db;
	schema: typeof schema;
	seed?: Record<string, unknown[]>;
}>({
	// the first element of the array is the default of the fixture
	seed: [undefined, { option: true }],
	db: [
		async ({ seed: seed_data }, use) => {
			// if we have the seed data instead of seeding the db with `drizzle-seed` we manually insert
			// the data in the db
			if (seed_data) {
				for (const table in seed_data) {
					if (seed_data[table] && seed_data[table].length > 0) {
						await db.insert(schema[table]).values(seed_data[table]);
					}
				}
			} else {
				await seed(db as never, schema);
			}
			await use(db);
			await reset(db as never, schema);
		},
		{ auto: true }
	],
	schema: async ({}, use) => {
		await use(schema);
	}
});
