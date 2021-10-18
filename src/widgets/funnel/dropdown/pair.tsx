import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode} from 'react';
import {DropdownOption} from '../../basic/types';
import {useRange} from '../use-range';
import {Editor} from './editor';

export const PairEditor = (props: {
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
	pairJoint: ReactNode;
}) => {
	const {funnel, acceptedType, options, pairJoint} = props;

	useRange(funnel);

	if (!funnel.enabled || funnel.type !== acceptedType || !funnel.range) {
		return null;
	}

	return <>
		<Editor funnel={funnel} valueIndex={0} options={options}/>
		{pairJoint}
		<Editor funnel={funnel} valueIndex={1} options={options}/>
	</>;
};