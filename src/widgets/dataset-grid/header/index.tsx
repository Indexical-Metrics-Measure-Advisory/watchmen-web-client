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
	languagesSupport: boolean;
}) => {
	const {
		data, pageable = true,
		onPageChange = () => {
		},
		downloadAll, languagesSupport
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
			<span>{languagesSupport ? Lang.DATASET.DOWNLOAD_PAGE : 'Download This Page'}</span>
		</DataSetHeaderButton>
		{pageable
			? <DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadAllClicked}>
				<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
				<span>{languagesSupport ? Lang.DATASET.DOWNLOAD_ALL : 'Download All'}</span>
			</DataSetHeaderButton>
			: null}
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onCompressColumnsWidthClicked}>
			<FontAwesomeIcon icon={ICON_COMPRESS_COLUMNS} transform={{rotate: 45}}/>
			<span>{languagesSupport ? Lang.DATASET.COMPRESS_COLUMNS : 'Compress Columns'}</span>
		</DataSetHeaderButton>
		{pageable
			? <DataSetHeaderPagination>
				{data.pageNumber !== 1
					? <DataSetHeaderPaginationButton
						tooltip={{
							label: languagesSupport ? Lang.ACTIONS.PREVIOUS_PAGE : 'Previous Page',
							alignment: TooltipAlignment.RIGHT,
							offsetX: 3
						}}
						onClick={onPreviousPageClicked}>
						<FontAwesomeIcon icon={ICON_PREVIOUS_PAGE}/>
					</DataSetHeaderPaginationButton>
					: null}
				<DataSetHeaderPaginationLabel>
					{languagesSupport ? Lang.PAGINATION.TOTAL : ''}
					<DataSetHeaderPaginationLabelBlank/>
					{data.itemCount}
					<DataSetHeaderPaginationLabelBlank/>
					{languagesSupport ? Lang.PAGINATION.ROWS : 'Row(s) Total'},
					<DataSetHeaderPaginationLabelBlank/>
					<DataSetHeaderPaginationLabelBlank>#</DataSetHeaderPaginationLabelBlank>
					{data.pageNumber}
					<DataSetHeaderPaginationLabelBlank/>
					{languagesSupport ? Lang.PAGINATION.OF_PAGES : 'of'}
					<DataSetHeaderPaginationLabelBlank/>
					{data.pageCount}
					<DataSetHeaderPaginationLabelBlank/>
					{languagesSupport ? Lang.PAGINATION.PAGES : 'Pages'}
				</DataSetHeaderPaginationLabel>
				{data.pageNumber !== data.pageCount
					? <DataSetHeaderPaginationButton
						tooltip={{
							label: languagesSupport ? Lang.ACTIONS.NEXT_PAGE : 'Next Page',
							alignment: TooltipAlignment.RIGHT,
							offsetX: 3
						}}
						onClick={onNextPageClicked}>
						<FontAwesomeIcon icon={ICON_NEXT_PAGE}/>
					</DataSetHeaderPaginationButton>
					: null}
			</DataSetHeaderPagination>
			: null}
	</DataSetHeaderContainer>;
};