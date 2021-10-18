import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelHalfYear} from '../widgets';

export const HalfYearEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfYear => ({value: `${halfYear}`, label: ReportFunnelHalfYear[halfYear - 1]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.HALF_YEAR} options={options}
	                       pairJoint={pairJoint}/>;
};