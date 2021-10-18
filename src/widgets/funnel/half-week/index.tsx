import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelHalfWeek} from '../widgets';

export const HalfWeekEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfWeek => ({value: `${halfWeek}`, label: ReportFunnelHalfWeek[halfWeek]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.HALF_WEEK} options={options}
	                       pairJoint={pairJoint}/>;
};