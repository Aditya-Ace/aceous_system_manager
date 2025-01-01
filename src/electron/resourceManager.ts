import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
import { BrowserWindow } from 'electron';

import { POLLING_INTERVAL } from './constants.js';

export const pollResources = (mainWindow: BrowserWindow) => {
	setInterval(async () => {
		try {
			const cpuUsage = await getCPUUsage();
			const ramUsage = await getRAMUsage();
			const diskUsage = getDISKUsage();
			mainWindow.webContents.send('statistics', {
				cpuUsage,
				ramUsage,
				diskUsage
			});
		} catch (e) {
			console.error(e);
		}
	}, POLLING_INTERVAL);
};

const getCPUUsage = () => {
	return new Promise((resolve) => {
		osUtils.cpuUsage((v) => {
			resolve(v);
		});
	});
};

const getRAMUsage = () => {
	return new Promise((resolve) => {
		resolve(1 - osUtils.freememPercentage());
	});
};

const getDISKUsage = () => {
	const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
	const total = stats.bsize * stats.blocks;
	const free = stats.bsize * stats.bfree;

	return {
		total: Math.floor(total / 1_000_000_000),
		free,
		used: 1 - free / total
	};
};

export const getStaticData = () => {
	const totalStorage = getDISKUsage().total;
	const cpuModel = os.cpus()[0].model;
	const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

	return {
		totalStorage,
		cpuModel,
		totalMemoryGB
	};
};
