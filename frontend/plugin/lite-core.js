import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { inject, shallowRef } from 'vue';

import { version as moekoeVersion } from '../src/package.json';

import { version } from '../../package.json';

const normalizeValue = v => v && JSON.stringify(v);

const cwd = process.cwd();

export default (userOptions) => {
	const options = {
		injectCode: resolve(cwd, 'inject/main.js'),
		injectScript: resolve(cwd, 'inject/lite-api.js'),
		injectStyle: resolve(cwd, 'inject/lite-style.css'),
		...userOptions
	}

	/** @type {import('vite').Plugin} */
	const plugin = {
		name: 'moekoelite:core',
		api: {
			version
		},
		config: () => ({
			define: {
				__VERSION__: normalizeValue(moekoeVersion)
			}
		}),
		version,
		transform(code, id) {
			if(id.includes('main.js')) {
				const injectCode = readFileSync(options.injectCode, 'utf-8');

				return { code: injectCode + code };
			}
			return null;
		},
		transformIndexHtml(html) {
			return [{
				tag: 'style',
				attrs: { id: 'lite-style', type: 'text/css' },
				children: readFileSync(options.injectStyle, 'utf-8'),
				injectTo: 'body-prepend'
			},
			{
				tag: 'script',
				attrs: {
					id: 'lite-api',
					type: 'text/javascript'
				},
				children: readFileSync(options.injectScript, 'utf-8')
						  .replaceAll('/*version*/', normalizeValue(moekoeVersion))
						  .replaceAll('/*lite_version*/', normalizeValue(version)),
				injectTo: 'head'
			}
			];
		}
	}

	return plugin;
}
