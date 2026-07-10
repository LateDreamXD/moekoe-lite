(() => {
	// hook electron api
	/** @type {import('@latedream/moekoe-types').ExposedElectronAPI} */
	const fakeElectron = {
		ipcRenderer: {
			send(channel, ...args) {
				console.debug('[Lite API] new message received:', channel, args);

				switch(channel) {
					case 'window-control':
						const action = args[0];
						if(!action) return;
						switch(action) {
							case 'minimize':
								return wails.Window.Minimise();
							case 'maximize':
								return wails.Window.ToggleMaximise();
							case 'close':
								return wails.Window.Close();
							default: return;
						}
					case 'disclaimer-response':
						return localStorage.disclaimerAccepted = args[0];
					case 'save-settings':
						// const settings = args[0];
						// wails.Window.SetFrameless(settings.nativeTitleBar === 'off');
				}
			},
			invoke(channel, ...args) {
				console.debug('[Lite API] new invoke received:', channel, args);
			},
			on(channel, func, ...args) {
				console.debug('[Lite API] new listener request:', channel, func, args);

				switch(channel) {
					case 'version':
						return func(null, /*version*/);
					case 'show-disclaimer':
						if(!JSON.parse(String(localStorage.getItem('disclaimerAccepted'))))
							return func(null);
						else return null;
				}
			},
			once(channel, func, ...args) {
				console.debug('[Lite API] new listener request(once):', channel, func, args);
			},
			removeListener(channel, func, ...args) {
				console.debug('[Lite API] remove listener request:', channel, func, args);
			},
			removeAllListeners(channel) {
				console.debug('[Lite API] remove all listeners request:', channel);
			},
		},
		platform: navigator.platform + ' - Lite'
	}

	/** @type {import('@latedream/moekoe-types').MoekoeElectronAPI} */
	const fakeElectronAPI = {
		getExtensions() { return null; },
		getExtensionsDetailed() { return null; },
		reloadExtensions() {},
		openExtensionsDir() { return null; },
		openExtensionPopup(id, name) { return null; },
		installExtension(path) { return null; },
		uninstallExtension(id, dir) { return null; },
		validateExtension(path) { return null; },
		getExtensionsDirectory() { return null; },
		ensureExtensionsDirectory() { return null; },
		installPluginFromZip(path) { return null; },
		installPluginFromUrl(url, id, dir) { return null; },
		setNativeHostAuthorization(pluginId, hostId, authorized) { return null; },
		nativeHost: {
			getStatus(hostId) { return null; },
			send(hostId, payload) { return null; },
			onMessage(listener) { return null; },
		},
		startUpdateDownload() { return null; },
		showOpenDiadebug(options) {},
		/** @deprecated */
		openMvWindow(url) { return null; },
		openLogPath() { return null; },
		exportdebug() { return null; }
	}

	Object.defineProperties(window, {
		electron: {
			configurable: false,
			writable: false,
			value: fakeElectron
		},
		electronAPI: {
			configurable: false,
			writable: false,
			value: fakeElectronAPI
		}
	});

	console.debug('[Lite API] inject succeeded.');
})();
