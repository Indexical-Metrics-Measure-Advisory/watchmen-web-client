import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React from 'react';
import {DropdownOption} from '../../basic/types';
import {useRange} from '../use-range';
import {Editor} from './editor';

export const SingleEditor = (props: {
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {funnel, acceptedType, options} = props;

	useRange(funnel);

	if (!funnel.enabled || funnel.type !== acceptedType || funnel.range) {
		return null;
	}

	return <Editor funnel={funnel} valueIndex={0} options={options}/>;
};
