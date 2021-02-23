import React, { useEffect, useState } from 'react';
import { LandscapeA3, LandscapeA4, PortraitA3, PortraitA4 } from '../../../../../basic-widgets/print-page-size';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../../subject-event-bus';
import { SubjectEventTypes } from '../../subject-event-bus-types';

export const PagePrintSize = (props: { subject: Subject }) => {
	const { subject } = props;

	const { on, off } = useSubjectEventBus();
	const [ showPageSize, setShowPageSize ] = useState(false);
	useEffect(() => {
		on(SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, setShowPageSize);
		return () => {
			off(SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, setShowPageSize);
		};
	}, [ on, off ]);
	useEffect(() => {
		setShowPageSize(false);
	}, [ subject ]);

	if (!showPageSize) {
		return null;
	}

	return <>
		<PortraitA4/>
		<LandscapeA4/>
		<PortraitA3/>
		<LandscapeA3/>
	</>;
};