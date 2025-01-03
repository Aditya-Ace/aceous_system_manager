import React, { useEffect, useState } from 'react';

import { Statistics } from '../../types';
import styles from './App.module.css';
import { EnhancedBaseChart } from './EnhancedBaseChart';
import { Footer } from './Footer';

const App: React.FC = () => {
	const [statistics, setStatistics] = useState<Statistics | null>(null);

	useEffect(() => {
		const unSub = window.electron.subscribeStatistics(
			(newStatistics: Statistics) => {
				setStatistics(newStatistics);
				console.log(newStatistics);
			}
		);
		return unSub;
	}, []);

	const getChartData = (key: keyof Statistics) => {
		if (!statistics) return [];
		return Object.entries(statistics[key]).map(([timestamp, value]) => ({
			value,
			timestamp: parseInt(timestamp)
		}));
	};

	return (
		<main className={styles.App}>
			<header className={styles.header}>
				<h1>System Resource Monitor</h1>
			</header>
			<div className={styles.chartContainer}>
				<EnhancedBaseChart
					data={getChartData('cpuUsage')}
					fill='#8884d8'
					stroke='#8884d8'
					label='CPU Usage'
				/>
				<EnhancedBaseChart
					data={getChartData('ramUsage')}
					fill='#82ca9d'
					stroke='#82ca9d'
					label='Memory Usage'
				/>
				<EnhancedBaseChart
					data={getChartData('diskUsage').map((data) => ({
						...data,
						value: (data.value / 1024 / 1024 / 1024) * 100
					}))}
					fill='#ffc658'
					stroke='#ffc658'
					label='Disk Usage'
				/>
			</div>
			<Footer />
		</main>
	);
};

export default App;
