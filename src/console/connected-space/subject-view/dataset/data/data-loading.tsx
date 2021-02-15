import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_LOADING } from '../../../../../basic-widgets/constants';
import { fetchSubjectData } from '../../../../../services/console/subject';
import { Subject } from '../../../../../services/tuples/subject-types';
import { DEFAULT_SUBJECT_DATASET_PAGE_SIZE } from '../constants';
import { useSubjectDataSetEventBus } from '../subject-dataset-event-bus';
import { SubjectDataSetEventTypes } from '../subject-dataset-event-bus-types';
import { ColumnDefs } from '../types';
import { SubjectDataSetLoading } from '../widgets';

const fetchData = async (options: { subject: Subject; pageNumber?: number; }) => {
	const { subject, pageNumber = 1 } = options;

	return await fetchSubjectData({
		subjectId: subject.subjectId,
		pageNumber,
		pageSize: DEFAULT_SUBJECT_DATASET_PAGE_SIZE
	});
};

export const DataLoading = (props: { subject: Subject }) => {
	const { subject } = props;

	const hasColumns = subject.dataset.columns.length !== 0;

	const { on, off, fire } = useSubjectDataSetEventBus();
	const [ visible, setVisible ] = useState(false);

	useEffect(() => {
		if (!hasColumns) {
			return;
		}
		const onColumnDefsReady = async (columnDefs: ColumnDefs) => {
			setVisible(true);
			try {
				const page = await fetchData({ subject });
				fire(SubjectDataSetEventTypes.PAGE_LOADED, page, columnDefs);
			} finally {
				setVisible(false);
			}
		};
		on(SubjectDataSetEventTypes.COLUMN_DEFS_READY, onColumnDefsReady);
		return () => {
			off(SubjectDataSetEventTypes.COLUMN_DEFS_READY, onColumnDefsReady);
		};
	}, [ on, off, fire, hasColumns, subject ]);
	useEffect(() => {
		const onPageChange = async (pageNumber: number, columnDefs: ColumnDefs) => {
			setVisible(true);
			try {
				const page = await fetchData({ subject, pageNumber });
				fire(SubjectDataSetEventTypes.PAGE_LOADED, page, columnDefs);
			} finally {
				setVisible(false);
			}
		};
		on(SubjectDataSetEventTypes.PAGE_CHANGE, onPageChange);
		return () => {
			off(SubjectDataSetEventTypes.PAGE_CHANGE, onPageChange);
		};
	}, [ on, off, fire, subject ]);

	return <SubjectDataSetLoading visible={visible}>
		<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
	</SubjectDataSetLoading>;

};