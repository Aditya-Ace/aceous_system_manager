type DiskUsage = {
	total: number;
	used: number;
	free: number;
};

export type Statistics = {
	cpuUsage: number;
	ramUsage: number;
	diskUsage: DiskUsage;
};

type StaticData = {
	totalStorage: number;
	cpuModel: string;
	totalMemoryGB: number;
};

type View = 'CPU' | 'RAM' | 'STORAGE';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';

type UnsubscribeFunction = () => void;

declare global {
	interface Window {
		electron: {
			subscribeStatistics: (
				callback: (statistics: Statistics) => void
			) => UnsubscribeFunction;
			getStaticData: () => Promise<StaticData>;
			subscribeChangeView: (
				callback: (view: View) => void
			) => UnsubscribeFunction;
			sendFrameAction: (payload: FrameWindowAction) => void;
		};
	}
}
