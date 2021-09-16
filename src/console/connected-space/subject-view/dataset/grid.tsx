import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';
import {Grid} from '@/dataset-grid';
import {GridEventBusProvider, useGridEventBus} from '@/dataset-grid/grid-event-bus';
import {SubjectDataSetEventTypes} from './subject-dataset-event-bus-types';
import {useSubjectDataSetEventBus} from './subject-dataset-event-bus';
import {EventTypes} from '@/events/types';
import {fetchSubjectData} from '@/services/console/subject';
import {MAX_SUBJECT_DATASET_SIZE} from './constants';
import {useEventBus} from '@/events/event-bus';
import {DataSetPage} from '@/services/console/dataset';
import {useEffect} from 'react';
import {ColumnDefs, DataPage} from '@/dataset-grid/types';
import {GridEventTypes} from '@/dataset-grid/grid-event-bus-types';

const SubjectDataGridController = () => {
	const {fire: fireGrid} = useGridEventBus();
	const {on, off} = useSubjectDataSetEventBus();
	useEffect(() => {
		const onPageLoaded = (page: DataPage, columnDefs: ColumnDefs) => {
			fireGrid(GridEventTypes.DATA_LOADED, page, columnDefs);
		};

		on(SubjectDataSetEventTypes.PAGE_LOADED, onPageLoaded);
		return () => {
			off(SubjectDataSetEventTypes.PAGE_LOADED, onPageLoaded);
		};
	}, [on, off, fireGrid]);

	return <></>;
};

const SubjectDataGridDelegate = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useSubjectDataSetEventBus();

	const onPageChange = (pageNumber: number, columnDefs: ColumnDefs) => {
		fire(SubjectDataSetEventTypes.PAGE_CHANGE, pageNumber, columnDefs);
	};
	const downloadAll = async (): Promise<DataSetPage<Array<any>>> => {
		return new Promise<DataSetPage<Array<any>>>(resolve => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchSubjectData({
					subjectId: subject.subjectId,
					pageNumber: 1,
					pageSize: MAX_SUBJECT_DATASET_SIZE
				}),
				(data) => resolve(data));
		});
	};

	const hasColumns = subject.dataset.columns.length !== 0;

	return <Grid hasColumns={hasColumns}
	             pageable={true} onPageChange={onPageChange}
	             downloadAll={downloadAll}/>;
};

export const SubjectDataGrid = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <GridEventBusProvider>
		<SubjectDataGridDelegate connectedSpace={connectedSpace} subject={subject}/>
		<SubjectDataGridController/>
	</GridEventBusProvider>;
};