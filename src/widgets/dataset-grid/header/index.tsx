import {DataSetPage} from '@/services/data/console/dataset';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AlertLabel} from '../../alert/widgets';
import {
	ICON_COMPRESS_COLUMNS,
	ICON_DOWNLOAD,
	ICON_DOWNLOAD_PAGE,
	ICON_NEXT_PAGE,
	ICON_PREVIOUS_PAGE,
	ICON_UPLOAD
} from '../../basic/constants';
import {Toggle} from '../../basic/toggle';
import {ButtonInk, TooltipAlignment} from '../../basic/types';
import {downloadAsCSV, downloadAsZip, uploadFile, UploadFileAcceptsTxtCsvJson} from '../../basic/utils';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {Lang} from '../../langs';
import {useGridEventBus} from '../grid-event-bus';
import {GridEventTypes} from '../grid-event-bus-types';
import {ColumnDefs, DataSetState} from '../types';
import {parseFromCsv, parseFromJson} from './dataset-import-from-file';
import {
	DataSetHeaderButton,
	DataSetHeaderContainer,
	DataSetHeaderPagination,
	DataSetHeaderPaginationButton,
	DataSetHeaderPaginationLabel,
	DataSetHeaderPaginationLabelBlank,
	DataSetSimulateSwitch,
	DataSetSimulateSwitchLabel
} from './widgets';

export const GridHeader = (props: {
	data: DataSetState;
	canSimulate?: boolean;
	simulating?: boolean;
	pageable?: boolean;
	onPageChange?: (pageNumber: number, columnDefs: ColumnDefs) => void;
	downloadAll?: () => Promise<DataSetPage>
	languagesSupport: boolean;
}) => {
	const {
		data, canSimulate = false, simulating = false, pageable = true,
		onPageChange = () => {
		},
		downloadAll, languagesSupport
	} = props;

	const {fire: fireGlobal} = useEventBus();
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

	const download = (page: DataSetPage) => {
		const header = [
			'""',
			...data.columnDefs.fixed.map(column => `"${(column.name || '').replace(/"/g, '""')}"`),
			...data.columnDefs.data.map(column => `"${(column.name || '').replace(/"/g, '""')}"`)
		].join(',');
		const body = page.data.map((row, rowIndex) => {
			return `${rowIndex + 1},${row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')}`;
		}).join('\n');
		const content = `${header}\n${body}\n`;
		downloadAsCSV(content, 'dataset', {date: true});
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
	const onSimulateEnabledChange = (value: boolean) => {
		fire(GridEventTypes.SIMULATOR_SWITCHED, value);
	};
	const onDownloadTemplateClicked = async () => {
		const headers = [
			...data.columnDefs.fixed.map(column => `"${(column.name || '').replace(/"/g, '""')}"`),
			...data.columnDefs.data.map(column => `"${(column.name || '').replace(/"/g, '""')}"`)
		];
		await downloadAsZip({
			'dataset-template.csv': headers.join(','),
			'dataset-template.json': JSON.stringify([headers.reduce((item, header) => {
				item[header] = null;
				return item;
			}, {} as { [key in string]: any })], null, '\t')
		}, 'dataset-template.zip');
	};
	const onFileSelected = async (file: File) => {
		const name = file.name;
		try {
			switch (true) {
				case name.endsWith('.txt'):
				case name.endsWith('.csv'): {
					const content = await file.text();
					const page = await parseFromCsv(content, data.columnDefs);
					fire(GridEventTypes.SIMULATE_DATA_UPLOADED, page);
					break;
				}
				case name.endsWith('.json'): {
					const content = await file.text();
					const page = await parseFromJson(content, data.columnDefs);
					fire(GridEventTypes.SIMULATE_DATA_UPLOADED, page);
					break;
				}
				default:
					fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
			}
		} catch {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{languagesSupport ? Lang.DATASET.UPLOAD_DATA_FAILURE : 'Failed to import dataset, check file format please.'}
			</AlertLabel>);
		}
	};
	const onUploadClicked = () => {
		uploadFile(UploadFileAcceptsTxtCsvJson, onFileSelected);
	};

	return <DataSetHeaderContainer>
		{canSimulate
			? <DataSetSimulateSwitch>
				<DataSetSimulateSwitchLabel>{languagesSupport ? Lang.DATASET.SIMULATE_DATA : 'Simulate'}</DataSetSimulateSwitchLabel>
				<Toggle value={simulating} onChange={onSimulateEnabledChange}/>
			</DataSetSimulateSwitch>
			: null}
		{simulating
			? <>
				<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadTemplateClicked}>
					<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
					<span>{languagesSupport ? Lang.DATASET.DOWNLOAD_TEMPLATE : 'Download Template'}</span>
				</DataSetHeaderButton>
				<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onUploadClicked}>
					<FontAwesomeIcon icon={ICON_UPLOAD}/>
					<span>{languagesSupport ? Lang.DATASET.UPLOAD_DATA : 'Upload Data'}</span>
				</DataSetHeaderButton>
			</>
			: null}
		{!simulating
			? <DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadCurrentClicked}>
				<FontAwesomeIcon icon={ICON_DOWNLOAD_PAGE}/>
				<span>{languagesSupport ? Lang.DATASET.DOWNLOAD_PAGE : 'Download This Page'}</span>
			</DataSetHeaderButton>
			: null}
		{!simulating && pageable
			? <DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadAllClicked}>
				<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
				<span>{languagesSupport ? Lang.DATASET.DOWNLOAD_ALL : 'Download All'}</span>
			</DataSetHeaderButton>
			: null}
		<DataSetHeaderButton ink={ButtonInk.PRIMARY} onClick={onCompressColumnsWidthClicked}>
			<FontAwesomeIcon icon={ICON_COMPRESS_COLUMNS} transform={{rotate: 45}}/>
			<span>{languagesSupport ? Lang.DATASET.COMPRESS_COLUMNS : 'Compress Columns'}</span>
		</DataSetHeaderButton>
		{!simulating && pageable
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