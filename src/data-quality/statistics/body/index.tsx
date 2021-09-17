import React from 'react';
import {BodyLayout} from './layout';
import {StatisticsBodyContainer} from './widgets';

export const StatisticsPageBody = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	return <StatisticsBodyContainer>
		<BodyLayout/>
		{children}
	</StatisticsBodyContainer>;
};