import {ReportFunnel} from '@/services/data/tuples/report-types';
import React, {ReactNode} from 'react';
import {PairDateEditor} from './pair';
import {SingleDateEditor} from './single';

export const DateEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	return <>
		<SingleDateEditor funnel={funnel}/>
		<PairDateEditor funnel={funnel} pairJoint={pairJoint}/>
	</>;
};