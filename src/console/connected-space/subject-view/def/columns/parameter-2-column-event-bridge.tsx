import React, {Fragment, useEffect} from 'react';
import {Subject, SubjectDataSetColumn} from '../../../../../services/tuples/subject-types';
import {useParameterEventBus} from '../../../../../data-filter/parameter-event-bus';
import {ParameterEventTypes} from '../../../../../data-filter/parameter-event-bus-types';
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