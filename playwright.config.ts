import { defineConfig } from '@playwright/test';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './src/lib/server/db/index.js';

migrate(db, {
	migrationsFolder: './drizzle'
});

export default defineConfig({
	webServer: {
		command: 'pnpm build && pnpm preview',
		port: 4173
	},
	testDir: 'e2e'
});
