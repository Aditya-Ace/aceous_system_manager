import React from 'react';
import { motion } from 'framer-motion';
import { StaticData } from '../../types';
import styles from './App.module.css';

type StaticDataDisplayProps = {
	data: StaticData;
};

export const StaticDataDisplay: React.FC<StaticDataDisplayProps> = ({
	data
}) => {
	console.log(data);
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={styles.container}
		>
			<div className={styles.card}>
				<h3>CPU Model</h3>
				<p>{data.cpuModel}</p>
			</div>
			<div className={styles.card}>
				<h3>Total Memory</h3>
				<p>{data.totalMemoryGB.toFixed(2)} GB</p>
			</div>
			<div className={styles.card}>
				<h3>Total Storage</h3>
				<p>{data.totalStorage} GB</p>
			</div>
		</motion.div>
	);
};
