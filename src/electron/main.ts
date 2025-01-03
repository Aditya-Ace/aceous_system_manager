import { app, BrowserWindow } from 'electron';

import { ipcMainHandle, isDevEnv } from './utils.js';
import { DEV_URL } from './constants.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { resolvePreLoadPath, resolveStaticPath } from './pathResolver.js';

const handleOnReady = () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: resolvePreLoadPath(),
			sandbox: false
		}
	});
	if (isDevEnv()) mainWindow.loadURL(DEV_URL);
	else mainWindow.loadFile(resolveStaticPath());
	pollResources(mainWindow);
	ipcMainHandle('getStaticData', () => getStaticData());
};

app.on('ready', handleOnReady);
