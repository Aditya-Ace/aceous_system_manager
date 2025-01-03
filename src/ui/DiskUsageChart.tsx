import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

import { DiskUsage } from '../../types';

type DiskUsageChartProps = {
	data: DiskUsage;
	fill: string;
	label: string;
};

export const DiskUsageChart: React.FC<DiskUsageChartProps> = ({
	data,
	fill,
	label
}) => {
	const usedGB = data.total * data.used;
	const freeGB = data.total - usedGB;

	const usedPercentage = (data.used * 100).toFixed(2);
	const freePercentage = (100 - parseFloat(usedPercentage)).toFixed(2);

	const chartData = [
		{ name: 'Used', value: data.used },
		{ name: 'Free', value: 1 - data.used }
	];

	const COLORS = ['#ffc658', '#36454F'];

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
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<motion.h3
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				style={{
					color: '#ffc658',
					fontSize: '1.2rem',
					fontWeight: 'bold',
					marginBottom: '20px',
					textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
				}}
			>
				{label}
			</motion.h3>
			<div
				style={{
					flex: 1,
					position: 'relative',
					marginBottom: '20px',
					minHeight: '160px'
				}}
			>
				<ResponsiveContainer width='100%' height={160}>
					<PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
						<Pie
							data={chartData}
							cx='50%'
							cy='50%'
							innerRadius={60}
							outerRadius={80}
							startAngle={90}
							endAngle={-270}
							fill={fill}
							strokeWidth={0}
							dataKey='value'
						>
							{chartData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index]}
									stroke={COLORS[index]}
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div
				style={{
					background: 'rgba(0,0,0,0.4)',
					borderRadius: '8px',
					padding: '15px',
					marginTop: 'auto'
				}}
			>
				<div
					style={{
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						gap: '8px'
					}}
				>
					<span
						style={{
							color: COLORS[0],
							fontSize: '1rem',
							fontWeight: '500'
						}}
					>
						Used: {usedPercentage}% ({usedGB.toFixed(2)} GB)
					</span>
					<span
						style={{
							color: '#666',
							fontSize: '0.9rem'
						}}
					>
						Free: {freePercentage}% ({freeGB.toFixed(2)} GB)
					</span>
					<span
						style={{
							color: '#fff',
							fontSize: '0.9rem',
							marginTop: '4px'
						}}
					>
						Total: {data.total.toFixed(2)} GB
					</span>
				</div>
			</div>
		</motion.div>
	);
};
