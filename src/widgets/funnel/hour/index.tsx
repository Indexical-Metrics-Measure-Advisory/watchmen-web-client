import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';

export const HourEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return new Array(23).fill(1)
			.map(hour => ({value: `${hour}`, label: `${hour}`}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.HOUR} options={options}
	                       pairJoint={pairJoint}/>;
};
