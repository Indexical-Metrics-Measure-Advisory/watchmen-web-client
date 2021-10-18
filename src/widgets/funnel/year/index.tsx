import {ReportFunnel} from '@/services/data/tuples/report-types';
import React, {ReactNode} from 'react';
import {PairYearEditor} from './pair';
import {SingleYearEditor} from './single';

export const YearEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	return <>
		<SingleYearEditor funnel={funnel}/>
		<PairYearEditor funnel={funnel} pairJoint={pairJoint}/>
	</>;
};