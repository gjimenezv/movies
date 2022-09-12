import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
	AutoGraph,
	BarChart,
	ShowChart,
	Circle,
	Architecture,
	Add
} from '@mui/icons-material';
import { useState, forwardRef } from 'react';
import Vizzu from 'vizzu';

enum CoordSystem {
	cartesian = 'cartesian',
	polar = 'polar'
}

enum Geometry {
	rectangle = 'rectangle',
	circle = 'circle',
	area = 'area',
	line = 'line'
}

export const Toolbar = forwardRef<Vizzu | undefined, {}>((props, ref) => {
	const [geometry, setGeometry] = useState('rectangle');
	const [coords, setCoords] = useState('cartesian');

	const handleChangeGeometry = (_, nextGeometry: Geometry) => {
		if (nextGeometry && ref?.current) {
			ref?.current?.animate({
				geometry: nextGeometry
			});
			setGeometry(nextGeometry);
		}
	};

	const handleChangeCoord = (_, nextCoord: CoordSystem) => {
		if (nextCoord) {
			ref?.current?.animate({
				config: {
					channels: { y: { range: { min: '-30%' } } },
					coordSystem: nextCoord
				}
			});
			setCoords(nextCoord);
		}
	};

	return (
		<Stack direction="row" spacing={4}>
			<ToggleButtonGroup
				size="small"
				orientation="horizontal"
				color="primary"
				value={geometry}
				exclusive
				onChange={handleChangeGeometry}
			>
				<ToggleButton value="rectangle" aria-label="rectangle">
					<BarChart />
				</ToggleButton>
				<ToggleButton value="circle" aria-label="circle">
					<Circle />
				</ToggleButton>
				<ToggleButton value="line" aria-label="line">
					<ShowChart />
				</ToggleButton>
				<ToggleButton value="area" aria-label="area">
					<AutoGraph />
				</ToggleButton>
			</ToggleButtonGroup>
			<ToggleButtonGroup
				size="small"
				orientation="horizontal"
				color="primary"
				value={coords}
				exclusive
				onChange={handleChangeCoord}
			>
				<ToggleButton value="cartesian" aria-label="cartesian">
					<Add />
				</ToggleButton>
				<ToggleButton value="polar" aria-label="cartesian">
					<Architecture />
				</ToggleButton>
			</ToggleButtonGroup>
		</Stack>
	);
});
