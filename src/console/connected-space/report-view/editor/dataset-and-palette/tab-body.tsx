import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React, {ReactNode} from 'react';
import {TabBodyContainer} from './widget';

export const TabBody = (props: {
	subject: Subject;
	report: Report;
	active: boolean;
	children: ReactNode
}) => {
	const {active, children} = props;

	if (!active) {
		return null;
	}

	return <TabBodyContainer>
		{children}
	</TabBodyContainer>;
};