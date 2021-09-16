import React from 'react';
import {MonitorLogAction} from '@/services/admin/logs';
import {BodyLabel, BodyValue} from './widgets';

export const ImpactRows = (props: { log: MonitorLogAction }) => {
	const {log} = props;
	return <>
		<BodyLabel>Insert Rows</BodyLabel>
		<BodyValue>{log.insertCount || 0}</BodyValue>
		<BodyLabel>Update Rows</BodyLabel>
		<BodyValue>{log.updateCount || 0}</BodyValue>
	</>;
};