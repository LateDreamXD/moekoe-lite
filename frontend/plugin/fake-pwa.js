export default function fakePwaPlugin() {
	return {
		name: 'fake-pwa',
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
	};
}
