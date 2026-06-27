import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import liteCore from './plugin/lite-core';
import fakePwaPlugin from './plugin/fake-pwa';

const cwd = process.cwd();

export default defineConfig({
	base: '',
	plugins: [vue(), liteCore(), fakePwaPlugin()],

	resolve: {
		alias: {
			'@': '/src',
		}
	},
	root: './src'
});
