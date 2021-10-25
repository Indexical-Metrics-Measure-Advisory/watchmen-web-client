import {DataSetPage} from '@/services/data/console/dataset';
import {fetchSubjectData} from '@/services/data/console/subject';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Grid} from '@/widgets/dataset-grid';
import {GridEventBusProvider, useGridEventBus} from '@/widgets/dataset-grid/grid-event-bus';
import {GridEventTypes} from '@/widgets/dataset-grid/grid-event-bus-types';
import {ColumnDefs, DataPage} from '@/widgets/dataset-grid/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect} from 'react';
import {MAX_SUBJECT_DATASET_SIZE} from './constants';
import {useSubjectDataSetEventBus} from './subject-dataset-event-bus';
import {SubjectDataSetEventTypes} from './subject-dataset-event-bus-types';

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

	return <Fragment/>;
};

const SubjectDataGridDelegate = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useSubjectDataSetEventBus();

	const onPageChange = (pageNumber: number, columnDefs: ColumnDefs) => {
		fire(SubjectDataSetEventTypes.PAGE_CHANGE, pageNumber, columnDefs);
	};
	const downloadAll = async (): Promise<DataSetPage> => {
		return new Promise<DataSetPage>(resolve => {
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