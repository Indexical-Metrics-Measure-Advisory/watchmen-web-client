import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React, {ReactNode, useState} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';
import {ReportFunnelAmPm} from '../widgets';

export const AmPmEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(ampm => ({value: `${ampm}`, label: ReportFunnelAmPm[ampm]}));
	});

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.AM_PM} options={options}
	                       pairJoint={pairJoint}/>;
};
