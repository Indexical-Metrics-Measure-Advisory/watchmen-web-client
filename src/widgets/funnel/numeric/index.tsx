import {ReportFunnel} from '@/services/data/tuples/report-types';
import React, {ReactNode} from 'react';
import {PairNumericEditor} from './pair';
import {SingleNumericEditor} from './single';

export const NumericEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	return <>
		<SingleNumericEditor funnel={funnel}/>
		<PairNumericEditor funnel={funnel} pairJoint={pairJoint}/>
	</>;
};