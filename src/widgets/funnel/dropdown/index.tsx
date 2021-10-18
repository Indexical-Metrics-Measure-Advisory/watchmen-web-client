import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode} from 'react';
import {DropdownOption} from '../../basic/types';
import {PairEditor} from './pair';
import {SingleEditor} from './single';

export const DropdownEditor = (props: {
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
	pairJoint: ReactNode;
}) => {
	const {funnel, acceptedType, options, pairJoint} = props;

	return <>
		<SingleEditor funnel={funnel} acceptedType={acceptedType} options={options}/>
		<PairEditor funnel={funnel} acceptedType={acceptedType} options={options} pairJoint={pairJoint}/>
	</>;
};