import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {TabBodyContainer} from './widget';

export const TabBody = (props: {
	subject: Subject;
	report: Report;
	active: boolean;
	children: ((props: any) => React.ReactNode) | React.ReactNode
}) => {
	const {active, children} = props;

	if (!active) {
		return null;
	}

	return <TabBodyContainer>
		{children}
	</TabBodyContainer>;
};