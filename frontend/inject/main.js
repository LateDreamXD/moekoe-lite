import * as wails from '@wailsio/runtime';
window.wails = wails;

(() => {
	/** @type {import('@latedream/moekoe-latelib-types').MoeKoeSettings} */
	const settings = JSON.parse(String(localStorage.getItem('settings')));

	wails.Window.SetFrameless(settings.nativeTitleBar === 'off');
})();
