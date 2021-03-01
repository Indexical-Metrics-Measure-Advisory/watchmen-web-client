import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import {
	ICON_COMPRESS_COLUMNS,
	ICON_DOWNLOAD,
	ICON_DOWNLOAD_PAGE,
	ICON_NEXT_PAGE,
	ICON_PREVIOUS_PAGE
} from '../../../../../../basic-widgets/constants';
import { ButtonInk, TooltipAlignment } from '../../../../../../basic-widgets/types';
import { useEventBus } from '../../../../../../events/event-bus';
import { EventTypes } from '../../../../../../events/types';
import { Lang } from '../../../../../../langs';
import { DataSetPage } from '../../../../../../services/console/dataset';
import { fetchSubjectData } from '../../../../../../services/console/subject';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { MAX_SUBJECT_DATASET_SIZE } from '../../constants';
import { useSubjectDataSetEventBus } from '../../subject-dataset-event-bus';
import { SubjectDataSetEventTypes } from '../../subject-dataset-event-bus-types';
import { DataSetState } from '../../types';
import { useGridEventBus } from '../body/grid-event-bus';
import { GridEventTypes } from '../body/grid-event-bus-types';
import {
	DataSetHeaderButton,
	DataSetHeaderContainer,
	DataSetHeaderPagination,
	DataSetHeaderPaginationButton,
	DataSetHeaderPaginationLabel,
	DataSetHeaderPaginationLabelBlank
} from './widgets';

export const GridHeader = (props: {
	subject: Subject;
	data: DataSetState;
}) => {
	const { subject, data } = props;

	const { fire: fireGlobal } = useEventBus();
	const { fire: fireDataSet } = useSubjectDataSetEventBus();
	const { fire } = useGridEventBus();

	const onPreviousPageClicked = () => {
		fireDataSet(SubjectDataSetEventTypes.PAGE_CHANGE, data.pageNumber - 1, data.columnDefs);
		fire(GridEventTypes.SELECTION_CHANGED, false, -1, -1);
	};
	const onNextPageClicked = () => {
		fireDataSet(SubjectDataSetEventTypes.PAGE_CHANGE, data.pageNumber + 1, data.columnDefs);
		fire(GridEventTypes.SELECTION_CHANGED, false, -1, -1);
	};

	const onCompressColumnsWidthClicked = () => {
		fire(GridEventTypes.COMPRESS_COLUMN_WIDTH);
	};

	const download = (page: DataSetPage<Array<any>>) => {
		const header = [
			'',
			...data.columnDefs.fixed.map(column => column.name),
			...data.columnDefs.data.map(column => column.name)
		].join('\t');
		const body = page.data.map((row, rowIndex) => `${rowIndex + 1}\t${row.join('\t')}`).join('\n');
		const content = `${header}\n${body}\n`;
		const link = document.createElement('a');
		link.href = 'data:text/csv;charset=utf-8,' + encodeURI(content);
		link.target = '_blank';
		//provide the name for the CSV file to be downloaded
		link.download = `${subject.name}-Page${page.pageNumber}-TotalItemCount${page.data.length}-${dayjs().format('YYYYMMDDHHmmss')}.csv`;
		link.click();
	};

	const onDownloadCurrentClicked = () => {
		download(data);
	};
	const onDownloadAllClicked = async () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchSubjectData({
				subjectId: subject.subjectId,
				pageNumber: 1,
				pageSize: MAX_SUBJECT_DATASET_SIZE
			}),
			(data) => download(data));
	};

	return <DataSetHeaderContainer>
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadCurrentClicked}>
			<FontAwesomeIcon icon={ICON_DOWNLOAD_PAGE}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.DOWNLOAD_PAGE}</span>
		</DataSetHeaderButton>
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadAllClicked}>
			<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.DOWNLOAD_ALL}</span>
		</DataSetHeaderButton>
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onCompressColumnsWidthClicked}>
			<FontAwesomeIcon icon={ICON_COMPRESS_COLUMNS} transform={{ rotate: 45 }}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.COMPRESS_COLUMNS}</span>
		</DataSetHeaderButton>
		<DataSetHeaderPagination>
			{data.pageNumber !== 1
				? <DataSetHeaderPaginationButton
					tooltip={{ label: Lang.ACTIONS.PREVIOUS_PAGE, alignment: TooltipAlignment.RIGHT, offsetX: 3 }}
					onClick={onPreviousPageClicked}>
					<FontAwesomeIcon icon={ICON_PREVIOUS_PAGE}/>
				</DataSetHeaderPaginationButton>
				: null}
			<DataSetHeaderPaginationLabel>
				{Lang.PAGINATION.TOTAL}
				<DataSetHeaderPaginationLabelBlank/>
				{data.itemCount}
				<DataSetHeaderPaginationLabelBlank/>
				{Lang.PAGINATION.ROWS},
				<DataSetHeaderPaginationLabelBlank/>
				<DataSetHeaderPaginationLabelBlank>#</DataSetHeaderPaginationLabelBlank>
				{data.pageNumber}
				<DataSetHeaderPaginationLabelBlank/>
				{Lang.PAGINATION.OF_PAGES}
				<DataSetHeaderPaginationLabelBlank/>
				{data.pageCount}
				<DataSetHeaderPaginationLabelBlank/>
				{Lang.PAGINATION.PAGES}
			</DataSetHeaderPaginationLabel>
			{data.pageNumber !== data.pageCount
				? <DataSetHeaderPaginationButton
					tooltip={{ label: Lang.ACTIONS.NEXT_PAGE, alignment: TooltipAlignment.RIGHT, offsetX: 3 }}
					onClick={onNextPageClicked}>
					<FontAwesomeIcon icon={ICON_NEXT_PAGE}/>
				</DataSetHeaderPaginationButton>
				: null}
		</DataSetHeaderPagination>
	</DataSetHeaderContainer>;

};