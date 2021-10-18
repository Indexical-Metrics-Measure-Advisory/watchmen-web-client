import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React from 'react';
import {useRange} from '../use-range';
import {Editor} from './editor';

export const SingleDateEditor = (props: { funnel: ReportFunnel }) => {
	const {funnel} = props;

	useRange(funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.DATE || funnel.range) {
		return null;
	}

	return <Editor funnel={funnel} valueIndex={0}/>;
};
