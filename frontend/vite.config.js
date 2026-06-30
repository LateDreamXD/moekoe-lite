import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import liteCore from './plugin/lite-core';
import fakePwaPlugin from './plugin/fake-pwa';

import { resolve } from 'path';

import { version } from './src/package.json';

const cwd = process.cwd();

export default defineConfig({
	base: '',
	build: {
		outDir: resolve(cwd, 'dist')
	},
	plugins: [vue(), liteCore(), fakePwaPlugin()],

	resolve: {
		alias: {
			'@': '/src',
		}
	},
	root: './src'
});
