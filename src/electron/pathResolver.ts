import path from 'path';
import { app } from 'electron';

import { isDevEnv } from './utils.js';

export const resolvePath = (): string => {
	return path.join(
		app.getAppPath(),
		isDevEnv() ? '.' : '..',
		'/dist-electron/preload.cjs'
	);
};
