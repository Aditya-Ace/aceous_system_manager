import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { EnhancedBaseChart } from './EnhancedBaseChart';
import { DiskUsageChart } from './DiskUsageChart';
import { StaticDataDisplay } from './StaticDataDisplay';
import { Footer } from './Footer';
import { StaticData, Statistics } from '../../types';

const MAX_DATA_POINTS = 60;

const App: React.FC = () => {
	const [cpuData, setCpuData] = useState<number[]>([]);
	const [ramData, setRamData] = useState<number[]>([]);
	const [diskUsage, setDiskUsage] = useState<Statistics['diskUsage'] | null>(
		null
	);
	const [staticData, setStaticData] = useState<StaticData | null>(null);

	useEffect(() => {
		const fetchStaticData = async () => {
			const data = await window.electron.getStaticData();
			setStaticData(data);
		};

		fetchStaticData();

		const unSub = window.electron.subscribeStatistics(
			(newStatistics: Statistics) => {
				setCpuData((prevData) =>
					[...prevData, newStatistics.cpuUsage * 100].slice(-MAX_DATA_POINTS)
				);
				setRamData((prevData) =>
					[...prevData, newStatistics.ramUsage * 100].slice(-MAX_DATA_POINTS)
				);
				setDiskUsage(newStatistics.diskUsage);
			}
		);

		return unSub;
	}, []);

	return (
		<main className={styles.App}>
			<header className={styles.header}>
				<h1>System Resource Monitor</h1>
			</header>
			{staticData && <StaticDataDisplay data={staticData} />}
			<div className={styles.chartContainer}>
				<EnhancedBaseChart
					data={cpuData}
					fill='#8884d8'
					stroke='#8884d8'
					label='CPU Usage'
				/>
				<EnhancedBaseChart
					data={ramData}
					fill='#82ca9d'
					stroke='#82ca9d'
					label='Memory Usage'
				/>
				{diskUsage && (
					<DiskUsageChart data={diskUsage} fill='#ffc658' label='Disk Usage' />
				)}
			</div>
			<Footer />
		</main>
	);
};

export default App;
