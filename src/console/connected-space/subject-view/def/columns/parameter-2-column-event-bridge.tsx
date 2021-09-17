import {Subject, SubjectDataSetColumn} from '@/services/data/tuples/subject-types';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import {useColumnEventBus} from './column-event-bus';
import {ColumnEventTypes} from './column-event-bus-types';

export const Parameter2ColumnEventBridge = (props: { subject: Subject, column: SubjectDataSetColumn }) => {
	const {column} = props;

	const {fire: fireColumn} = useColumnEventBus();
	const {on, off} = useParameterEventBus();
	useEffect(() => {
		const onParamChanged = () => {
			fireColumn(ColumnEventTypes.CONTENT_CHANGED, column);
		};
		on(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		};
	}, [on, off, fireColumn, column]);

	return <Fragment/>;
};