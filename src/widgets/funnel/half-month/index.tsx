import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelHalfMonth} from '../widgets';

export const HalfMonthEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfMonth => ({value: `${halfMonth}`, label: ReportFunnelHalfMonth[halfMonth - 1]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.HALF_MONTH} options={options}
	                       pairJoint={pairJoint}/>;
};