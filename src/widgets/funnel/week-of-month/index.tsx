import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelWeekOfMonth} from '../widgets';

export const WeekOfMonthEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [0, 1, 2, 3, 4, 5].map(week => ({value: `${week}`, label: ReportFunnelWeekOfMonth[week]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.WEEK_OF_MONTH} options={options}
	                       pairJoint={pairJoint}/>;
};
