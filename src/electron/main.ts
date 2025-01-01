import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import { isDevEnv } from './utils.js';
import { DEV_URL } from './constants.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { resolvePreLoadPath } from './pathResolver.js';

const handleOnReady = () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: resolvePreLoadPath()
		}
	});
	if (isDevEnv()) mainWindow.loadURL(DEV_URL);
	else
		mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
	pollResources(mainWindow);
	ipcMain.handle('getStaticData', () => getStaticData());
};

app.on('ready', handleOnReady);
