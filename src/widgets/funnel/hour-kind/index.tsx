import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelHourKind} from '../widgets';

export const HourKindEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(hourKind => ({value: `${hourKind}`, label: ReportFunnelHourKind[hourKind]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.HOUR_KIND} options={options}
	                       pairJoint={pairJoint}/>;
};