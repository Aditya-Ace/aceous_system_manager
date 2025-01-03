import React from 'react';
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

type EnhancedBaseChartProps = {
	data: number[];
	fill: string;
	stroke: string;
	label: string;
};

export function EnhancedBaseChart(props: EnhancedBaseChartProps) {
	const latestValue = props.data[props.data.length - 1] || 0;
	const chartData = props.data.map((value, index) => ({ value, index }));

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			style={{
				background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
				height: '300px',
				position: 'relative',
				overflow: 'hidden'
			}}
		>
			<motion.h3
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				style={{
					color: props.stroke,
					fontSize: '1.2rem',
					fontWeight: 'bold',
					marginBottom: '10px',
					textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
				}}
			>
				{props.label}
			</motion.h3>
			<ResponsiveContainer width='100%' height='80%'>
				<AreaChart data={chartData}>
					<defs>
						<linearGradient
							id={`colorGradient-${props.label}`}
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop offset='5%' stopColor={props.fill} stopOpacity={0.8} />
							<stop offset='95%' stopColor={props.fill} stopOpacity={0.1} />
						</linearGradient>
					</defs>
					<XAxis dataKey='index' hide />
					<YAxis hide domain={[0, 100]} />
					<Tooltip
						contentStyle={{
							background: 'rgba(0, 0, 0, 0.8)',
							border: 'none',
							borderRadius: '4px',
							boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
						}}
						labelStyle={{ color: '#fff' }}
						formatter={(value) => [`${Number(value).toFixed(2)}%`, props.label]}
					/>
					<Area
						type='monotone'
						dataKey='value'
						stroke={props.stroke}
						fill={`url(#colorGradient-${props.label})`}
						strokeWidth={2}
					/>
				</AreaChart>
			</ResponsiveContainer>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					background: props.fill,
					borderRadius: '50%',
					width: '10px',
					height: '10px',
					boxShadow: `0 0 10px ${props.fill}`
				}}
			/>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7, duration: 0.5 }}
				style={{
					position: 'absolute',
					bottom: '10px',
					right: '10px',
					color: props.stroke,
					fontSize: '1.5rem',
					fontWeight: 'bold'
				}}
			>
				{latestValue.toFixed(2)}%
			</motion.div>
		</motion.div>
	);
}
