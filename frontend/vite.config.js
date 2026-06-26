import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fakePwaPlugin from './plugin/fake-pwa';

import { resolve } from 'path';

import { version } from './src/package.json';

const cwd = process.cwd();

export default defineConfig({
	base: '',
	build: {
		outDir: resolve(cwd, 'dist')
	},
	define: {
		__VERSION__: JSON.stringify(version)
	},
	plugins: [vue(), fakePwaPlugin()],

	resolve: {
		alias: {
			'@': '/src',
		}
	},
	root: './src'
});
