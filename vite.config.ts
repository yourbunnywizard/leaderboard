import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/leaderboard',
	plugins: [react()],
	resolve: {
		alias: {
			components: '/src/components',
			types: '/src/types',
			hooks: '/src/hooks',
			utils: '/src/utils',
			store: '/src/store',
			styles: '/src/styles',
		},
	},
});
