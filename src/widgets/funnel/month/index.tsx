import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelMonth} from '../widgets';

export const MonthEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => ({
			value: `${month}`,
			label: ReportFunnelMonth[month - 1]
		}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.MONTH} options={options}
	                       pairJoint={pairJoint}/>;
};