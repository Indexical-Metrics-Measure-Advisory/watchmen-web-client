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
import { TooltipButton } from '../../../../../../basic-widgets/tooltip-button';
import { TooltipAlignment } from '../../../../../../basic-widgets/types';
import { DataSetPage } from '../../../../../../services/console/dataset';
import { fetchSubjectData } from '../../../../../../services/console/subject';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { MAX_SUBJECT_DATASET_SIZE } from '../../constants';
import { DataSetState } from '../../types';
import { DataSetGridHeaderContainer, DataSetGridPagination } from './widgets';

export const DataSetHeader = (props: {
	subject: Subject;
	data: DataSetState;
}) => {
	const { subject, data } = props;

	// const { selectionChange, compressColumnWidth } = useDataSetTableContext();

	const onPreviousPageClicked = () => {
		// fetchData(data.pageNumber - 1);
		// selectionChange(false, -1, -1);
	};
	const onNextPageClicked = () => {
		// fetchData(data.pageNumber + 1);
		// selectionChange(false, -1, -1);
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
		const data = await fetchSubjectData({
			subjectId: subject.subjectId,
			pageNumber: 1,
			pageSize: MAX_SUBJECT_DATASET_SIZE
		});
		download(data);
	};

	return <DataSetGridHeaderContainer>
		<DataSetGridPagination>
			{data.pageNumber !== 1
				? <TooltipButton tooltip={{ label: 'Previous Page', alignment: TooltipAlignment.CENTER }}
				                 onClick={onPreviousPageClicked}>
					<FontAwesomeIcon icon={ICON_PREVIOUS_PAGE}/>
				</TooltipButton>
				: null}
			<div>
				{data.itemCount} Row{data.itemCount !== 1 ? 's' : ''} Total, <span>#</span>{data.pageNumber} of {data.pageCount} Pages.
			</div>
			{data.pageNumber !== data.pageCount
				? <TooltipButton tooltip={{ label: 'Next Page', alignment: TooltipAlignment.CENTER }}
				                 onClick={onNextPageClicked}>
					<FontAwesomeIcon icon={ICON_NEXT_PAGE}/>
				</TooltipButton>
				: null}
		</DataSetGridPagination>
		<TooltipButton tooltip={{ label: 'Compress Columns', alignment: TooltipAlignment.RIGHT, offsetX: 3 }}>
			{/*onClick={compressColumnWidth}>*/}
			<FontAwesomeIcon icon={ICON_COMPRESS_COLUMNS} transform={{ rotate: 45 }}/>
		</TooltipButton>
		<TooltipButton tooltip={{ label: 'Download Current Page', alignment: TooltipAlignment.RIGHT, offsetX: 3 }}
		               onClick={onDownloadCurrentClicked}>
			<FontAwesomeIcon icon={ICON_DOWNLOAD_PAGE}/>
		</TooltipButton>
		<TooltipButton tooltip={{ label: 'Download All Pages', alignment: TooltipAlignment.RIGHT, offsetX: 3 }}
		               onClick={onDownloadAllClicked}>
			<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
		</TooltipButton>
	</DataSetGridHeaderContainer>;

};