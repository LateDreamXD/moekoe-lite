import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import wails from '@wailsio/runtime/plugins/vite';
import liteCore from './plugin/lite-core';
import fakePwaPlugin from './plugin/fake-pwa';

import { resolve } from 'path';

const cwd = process.cwd();

export default defineConfig({
	base: '',
	build: {
		emptyOutDir: true,
		outDir: resolve(cwd, 'dist')
	},
	plugins: [vue(), wails(resolve(cwd, './bindings')), liteCore(), fakePwaPlugin()],

	resolve: {
		alias: {
			'@': '/src',
		}
	},
	root: './src',
	server: {
		host: '127.0.0.1',
		port: Number(process.env.WAILS_VITE_PORT) || 9245,
		strictPort: true,
	}
});
