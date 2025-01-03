import React from 'react';
import {
	ResponsiveContainer,
	AreaChart,
	CartesianGrid,
	Area,
	XAxis,
	YAxis,
	Tooltip
} from 'recharts';

type BaseChartProps = {
	data: { value: number | undefined; timestamp: number }[];
	fill: string;
	stroke: string;
	label: string;
};

export function BaseChart(props: BaseChartProps) {
	const gradientId = `gradient-${props.label.toLowerCase()}`;

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<AreaChart data={props.data}>
				<defs>
					<linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
						<stop offset='5%' stopColor={props.fill} stopOpacity={0.8} />
						<stop offset='95%' stopColor={props.fill} stopOpacity={0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid stroke='#333' strokeDasharray='3 3' vertical={false} />
				<XAxis
					dataKey='timestamp'
					stroke='#888'
					tickFormatter={(timestamp) =>
						new Date(timestamp).toLocaleTimeString()
					}
					tick={{ fontSize: 10 }}
				/>
				<YAxis
					domain={[0, 100]}
					stroke='#888'
					tick={{ fontSize: 10 }}
					tickFormatter={(value) => `${value}%`}
				/>
				<Tooltip
					contentStyle={{
						background: 'rgba(0, 0, 0, 0.8)',
						border: 'none',
						borderRadius: '4px',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
					}}
					labelStyle={{ color: '#fff' }}
					itemStyle={{ color: props.stroke }}
					formatter={(value) => [`${value}%`, props.label]}
					labelFormatter={(label) => new Date(label).toLocaleString()}
				/>
				<Area
					type='monotone'
					dataKey='value'
					stroke={props.stroke}
					strokeWidth={3}
					fill={`url(#${gradientId})`}
					fillOpacity={1}
					isAnimationActive={true}
					animationDuration={1000}
					animationEasing='ease-in-out'
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
