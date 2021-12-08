import {ReactNode} from 'react';
import styled from 'styled-components';
import {ChartRootContainer} from './widgets';

export const InternalChartContainer = styled.div.attrs({'data-widget': 'inspection-internal-chart-container'})`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;

export const ChartContainer = (props: { children: ReactNode }) => {
	const {children} = props;

	return <ChartRootContainer>
		{children}
	</ChartRootContainer>;
};