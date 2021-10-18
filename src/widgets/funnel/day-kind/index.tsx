import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelDayKind} from '../widgets';

export const DayKindEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(dayKind => ({value: `${dayKind}`, label: ReportFunnelDayKind[dayKind]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.DAY_KIND} options={options}
	                       pairJoint={pairJoint}/>;
};