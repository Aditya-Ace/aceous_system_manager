import path from 'path';
import { app } from 'electron';

import { isDevEnv } from './utils.js';

export const resolvePreLoadPath = (): string => {
	return path.join(
		app.getAppPath(),
		isDevEnv() ? '.' : '..',
		'/dist-electron/preload.cjs'
	);
};

export const resolveStaticPath = (): string =>
	path.join(app.getAppPath(), '/dist-react/index.html');
