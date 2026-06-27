/** @type {() => import('vite').Plugin<unknown>} */
export default function fakePwaPlugin() {
	return {
		name: 'moekoelite:fake-pwa',
		resolveId(id) {
			if (id === 'virtual:pwa-register')
				return '\0virtual:pwa-register';
			return null;
		},
		load(id) {
			if (id === '\0virtual:pwa-register')
				return `export const registerSW = () => void 0;`;
			return null;
		},
		version: '0.0.0'
	};
}
