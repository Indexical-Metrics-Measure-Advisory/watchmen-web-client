import {Subject} from '@/services/tuples/subject-types';
import {Report} from '@/services/tuples/report-types';
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