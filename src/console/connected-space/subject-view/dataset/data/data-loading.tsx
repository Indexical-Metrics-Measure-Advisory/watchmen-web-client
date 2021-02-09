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

export const DataLoading = (props: { subject: Subject }) => {
	const { subject } = props;

	const hasColumns = subject.dataset.columns.length !== 0;

	const { on, off, fire } = useSubjectDataSetEventBus();
	const [ visible, setVisible ] = useState(false);
	useEffect(() => {
		if (!hasColumns) {
			return;
		}
		const fetchData = (columnDefs: ColumnDefs, pageNumber: number = 1) => {
			(async () => {
				try {
					const data = await fetchSubjectData({
						subjectId: subject.subjectId,
						pageNumber,
						pageSize: DEFAULT_SUBJECT_DATASET_PAGE_SIZE
					});
					fire(SubjectDataSetEventTypes.PAGE_LOADED, data, columnDefs);
				} finally {
					setVisible(false);
				}
			})();
		};
		const onColumnDefsReady = (columnDefs: ColumnDefs) => {
			setVisible(true);
			fetchData(columnDefs);
		};
		on(SubjectDataSetEventTypes.COLUMN_DEFS_READY, onColumnDefsReady);
		return () => {
			off(SubjectDataSetEventTypes.COLUMN_DEFS_READY, onColumnDefsReady);
		};
	}, [ on, off, fire, hasColumns, subject.subjectId ]);

	return <SubjectDataSetLoading visible={visible}>
		<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
	</SubjectDataSetLoading>;

};