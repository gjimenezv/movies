import { useRef, useEffect } from 'react';
import Vizzu, { AnimTarget } from 'vizzu';
import { Toolbar } from './toolbar';
import { Box } from '@mui/material';

interface VizzuChartProps extends AnimTarget {
	title?: string;
	tooltip?: boolean;
}

export const VizzuChart = (props: VizzuChartProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ref = useRef<Vizzu>();

	useEffect(() => {
		if (!canvasRef.current) {
			console.error('There is no canvas to draw on! (yet?)');
			return;
		}

		if (ref.current) return; // this is needed because of Hot Module Replacement

		ref.current = new Vizzu(canvasRef?.current, {
			title: props.title,
			data: props.data
		});
		ref.current.initializing.then((chart) => {
			chart.animate({
				config: props.config,
				style: props.style
			});
			chart.animate({
				title: props.title
			});
			chart.feature('tooltip', true);
		});
	}, []);

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			<canvas
				ref={canvasRef}
				style={{
					width: '80%',
					height: '80%'
				}}
			/>
			<Toolbar ref={ref} />
		</Box>
	);
};
