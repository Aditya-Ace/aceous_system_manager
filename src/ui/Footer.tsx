import React from 'react';
import styles from './App.module.css';

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<p>
				&copy; {new Date().getFullYear()} System Resource Monitor. All rights
				reserved.
			</p>
			<p>Dev: Aditya Tiwari</p>
			<div className={styles.links}>
				<a
					href='https://electronjs.org/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Electron
				</a>
				<a href='https://vitejs.dev/' target='_blank' rel='noopener noreferrer'>
					Vite
				</a>
				<a
					href='https://recharts.org/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Recharts
				</a>
			</div>
		</footer>
	);
};
