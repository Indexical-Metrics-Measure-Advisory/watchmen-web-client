import React, {ReactNode} from 'react';
import {BodyLayout} from './layout';
import {StatisticsBodyContainer} from './widgets';

export const StatisticsPageBody = (props: { children?: ReactNode }) => {
	const {children} = props;

	return <StatisticsBodyContainer>
		<BodyLayout/>
		{children}
	</StatisticsBodyContainer>;
};