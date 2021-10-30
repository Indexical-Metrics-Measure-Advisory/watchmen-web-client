import {Report} from '@/services/data/tuples/report-types';
import React from 'react';
import {Container} from './container';

export const Chart = (props: {
	report: Report;
	fixed: boolean;
	editable: boolean;
	/** chart can be readonly mode and editing mode */
	editing: boolean;
	removable: boolean;
	thumbnail?: boolean;
}) => {
	const {report, fixed, editable, editing, removable, thumbnail = false} = props;

	return <Container report={report} fixed={fixed}
	                  editable={editable} editing={editing}
	                  removable={removable}
	                  thumbnail={thumbnail}/>;
};