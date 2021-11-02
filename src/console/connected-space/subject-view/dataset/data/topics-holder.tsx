import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {DEFAULT_COLUMN_WIDTH} from '@/widgets/dataset-grid/constants';
import {ColumnDefs, ColumnSortBy} from '@/widgets/dataset-grid/types';
import React, {Fragment, useEffect, useState} from 'react';
import {useSubjectDataSetEventBus} from '../subject-dataset-event-bus';
import {SubjectDataSetEventTypes} from '../subject-dataset-event-bus-types';

export const TopicsHolder = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;
	const hasColumns = subject.dataset.columns.length !== 0;

	const {on, off, fire} = useSubjectDataSetEventBus();
	const [columnDefs, setColumnDefs] = useState<ColumnDefs>({fixed: [], data: []});

	useEffect(() => {
		const onAskColumnDefs = (onData: (columnDefs: ColumnDefs) => void) => onData(columnDefs);
		on(SubjectDataSetEventTypes.ASK_COLUMN_DEFS, onAskColumnDefs);
		return () => {
			off(SubjectDataSetEventTypes.ASK_COLUMN_DEFS, onAskColumnDefs);
		};
	}, [on, off, fire, columnDefs]);
	useEffect(() => {
		if (!hasColumns) {
			// no columns, do nothing
			return;
		}

		const columnDefs = {
			fixed: [],
			data: subject.dataset.columns.map((column, columnIndex) => {
				return {
					column,
					name: column.alias?.trim() || `Column ${columnIndex + 1}`,
					sort: ColumnSortBy.NONE,
					fixed: false,
					width: DEFAULT_COLUMN_WIDTH,
					index: columnIndex
				};
			})
		};
		setColumnDefs(columnDefs);
		fire(SubjectDataSetEventTypes.COLUMN_DEFS_READY, columnDefs);
	}, [fire, hasColumns, subject.dataset.columns]);

	return <Fragment/>;
};