import { shallowRef } from 'vue';

import { version as moekoeVersion } from '../src/package.json';
import wailsConf from '../../wails.json';

const version = wailsConf.info.productVersion;

const normalizeValue = v => v && JSON.stringify(v);

export default (userOptions) => {
	const options = {
		injectScript: '',
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
				__VERSION__: normalizeValue(moekoeVersion),
				__MOEKOE_LITE_CORE__: normalizeValue(version)
			}
		}),
		version
	}

	return plugin;
}
