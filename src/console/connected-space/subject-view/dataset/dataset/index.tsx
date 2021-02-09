import { useEffect, useState } from 'react';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useSubjectDataSetEventBus } from '../subject-dataset-event-bus';
import { SubjectDataSetEventTypes } from '../subject-dataset-event-bus-types';
import { ColumnDefs, DataSetState, SubjectDataPage } from '../types';
import { SubjectDataSetGridContainer } from '../widgets';
import { DataSetHeader } from './header/dataset-header';

export const DataSet = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { subject } = props;
	const hasColumns = subject.dataset.columns.length !== 0;

	const { on, off } = useSubjectDataSetEventBus();
	const [ data, setData ] = useState<DataSetState>({
		itemCount: 0,
		pageNumber: 1,
		pageSize: 1,
		pageCount: 1,
		data: [],
		loaded: false,
		columnDefs: { fixed: [], data: [] }
	});
	useEffect(() => {
		if (!hasColumns) {
			return;
		}

		const onPageLoaded = (page: SubjectDataPage, columnDefs: ColumnDefs) => {
			setData({ ...page, loaded: true, columnDefs });
		};

		on(SubjectDataSetEventTypes.PAGE_LOADED, onPageLoaded);
		return () => {
			off(SubjectDataSetEventTypes.PAGE_LOADED, onPageLoaded);
		};
	}, [ on, off, hasColumns ]);

	if (!hasColumns || !data.loaded) {
		return null;
	}

	return <SubjectDataSetGridContainer>
		<DataSetHeader subject={subject} data={data}/>
		{/*<DataSetTableWrapper space={space} subject={subject}*/}
		{/*                     columnDefs={columnDefs}*/}
		{/*                     data={data}/>*/}
	</SubjectDataSetGridContainer>;
};