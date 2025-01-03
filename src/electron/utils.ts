import { ipcMain, WebFrameMain } from 'electron';
import { pathToFileURL } from 'url';

import { resolveStaticPath } from './pathResolver.js';

export function isDevEnv(): boolean {
	return process.env.NODE_ENV === 'development';
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
	key: Key,
	handler: () => EventPayloadMapping[Key]
) {
	ipcMain.handle(key, (event) => {
		if (event?.senderFrame) {
			validateEventFrame(event.senderFrame);
		}
		return handler();
	});
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
	contents: Electron.WebContents,
	key: Key,
	payload: EventPayloadMapping[Key]
) {
	contents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain) {
	console.log(frame.url);
	if (isDevEnv() && new URL(frame.url).host === 'localhost:5123') {
		return;
	}
	if (frame.url !== pathToFileURL(resolveStaticPath()).toString()) {
		throw new Error('Malicious event');
	}
}

// export function ipcMainOn<Key extends keyof EventPayloadMapping>(
// 	key: Key,
// 	handler: (payload: EventPayloadMapping[Key]) => void
// ) {
// 	ipcMain.on(key, (event, payload) => {
// 		validateEventFrame(event.senderFrame);
// 		return handler(payload);
// 	});
// }
