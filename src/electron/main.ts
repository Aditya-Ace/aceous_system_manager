import { app, BrowserWindow } from 'electron';
import path from 'path';

import { isDevEnv } from './utils.js';
import { DEV_URL } from './constants.js';
import { pollResources } from './resourceManager.js';

const handleOnReady = () => {
	const mainWindow = new BrowserWindow({});
	if (isDevEnv()) mainWindow.loadURL(DEV_URL);
	else
		mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
	pollResources();
};

app.on('ready', handleOnReady);
