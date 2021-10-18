import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelQuarter} from '../widgets';

export const QuarterEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3, 4].map(quarter => ({value: `${quarter}`, label: ReportFunnelQuarter[quarter - 1]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.QUARTER} options={options}
	                       pairJoint={pairJoint}/>;
};