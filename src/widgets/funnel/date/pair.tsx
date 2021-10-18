import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode} from 'react';
import {useRange} from '../use-range';
import {Editor} from './editor';

export const PairDateEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	useRange(funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.DATE || !funnel.range) {
		return null;
	}

	return <>
		<Editor funnel={funnel} valueIndex={0}/>
		{pairJoint}
		<Editor funnel={funnel} valueIndex={1}/>
	</>;
};