import { BaseChart } from './BaseChart';
import { motion } from 'framer-motion';

type EnhancedBaseChartProps = {
	data: { value: number | undefined; timestamp: number }[];
	fill: string;
	stroke: string;
	label: string;
};

export function EnhancedBaseChart(props: EnhancedBaseChartProps) {
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
			<BaseChart {...props} />
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
		</motion.div>
	);
}
