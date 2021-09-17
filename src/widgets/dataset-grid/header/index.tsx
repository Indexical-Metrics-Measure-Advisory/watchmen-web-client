import {DataSetPage} from '@/services/data/console/dataset';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import {
	ICON_COMPRESS_COLUMNS,
	ICON_DOWNLOAD,
	ICON_DOWNLOAD_PAGE,
	ICON_NEXT_PAGE,
	ICON_PREVIOUS_PAGE
} from '../../basic/constants';
import {ButtonInk, TooltipAlignment} from '../../basic/types';
import {Lang} from '../../langs';
import {useGridEventBus} from '../grid-event-bus';
import {GridEventTypes} from '../grid-event-bus-types';
import {ColumnDefs, DataSetState} from '../types';
import {
	DataSetHeaderButton,
	DataSetHeaderContainer,
	DataSetHeaderPagination,
	DataSetHeaderPaginationButton,
	DataSetHeaderPaginationLabel,
	DataSetHeaderPaginationLabelBlank
} from './widgets';

export const GridHeader = (props: {
	data: DataSetState;
	pageable?: boolean;
	onPageChange?: (pageNumber: number, columnDefs: ColumnDefs) => void;
	downloadAll?: () => Promise<DataSetPage<Array<any>>>
}) => {
	const {
		data, pageable = true,
		onPageChange = () => {
		},
		downloadAll
	} = props;

	const {fire} = useGridEventBus();

	const onPreviousPageClicked = () => {
		onPageChange(data.pageNumber - 1, data.columnDefs);
		fire(GridEventTypes.SELECTION_CHANGED, false, -1, -1);
	};
	const onNextPageClicked = () => {
		onPageChange(data.pageNumber + 1, data.columnDefs);
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
		link.download = `Dataset-${pageable ? `Page${page.pageNumber}-` : ''}TotalItemCount${page.data.length}-${dayjs().format('YYYYMMDDHHmmss')}.csv`;
		link.click();
	};

	const onDownloadCurrentClicked = () => {
		download(data);
	};
	const onDownloadAllClicked = async () => {
		if (downloadAll) {
			const data = await downloadAll();
			download(data);
		}
	};

	return <DataSetHeaderContainer>
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadCurrentClicked}>
			<FontAwesomeIcon icon={ICON_DOWNLOAD_PAGE}/>
			<span>{Lang.DATASET.DOWNLOAD_PAGE}</span>
		</DataSetHeaderButton>
		{pageable
			? <DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadAllClicked}>
				<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
				<span>{Lang.DATASET.DOWNLOAD_ALL}</span>
			</DataSetHeaderButton>
			: null}
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onCompressColumnsWidthClicked}>
			<FontAwesomeIcon icon={ICON_COMPRESS_COLUMNS} transform={{rotate: 45}}/>
			<span>{Lang.DATASET.COMPRESS_COLUMNS}</span>
		</DataSetHeaderButton>
		{pageable
			? <DataSetHeaderPagination>
				{data.pageNumber !== 1
					? <DataSetHeaderPaginationButton
						tooltip={{label: Lang.ACTIONS.PREVIOUS_PAGE, alignment: TooltipAlignment.RIGHT, offsetX: 3}}
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
						tooltip={{label: Lang.ACTIONS.NEXT_PAGE, alignment: TooltipAlignment.RIGHT, offsetX: 3}}
						onClick={onNextPageClicked}>
						<FontAwesomeIcon icon={ICON_NEXT_PAGE}/>
					</DataSetHeaderPaginationButton>
					: null}
			</DataSetHeaderPagination>
			: null}
	</DataSetHeaderContainer>;
};