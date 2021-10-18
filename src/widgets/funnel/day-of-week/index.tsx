import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';

export const DayOfWeekEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return new Array(31).fill(1)
			.map((_, index) => index + 1)
			.map(day => ({value: `${day}`, label: `${day}`}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.DAY_OF_WEEK} options={options}
	                       pairJoint={pairJoint}/>;
};
