import { matchPath } from 'react-router-dom';
import { Router } from '../../../../routes/types';

export const isSubjectDefNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF);
export const isSubjectDataNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA);
export const isSubjectReportNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT);

// TODO download
// export const download = (data: DataPage<Array<any>>) => {
// 	const header = [
// 		'',
// 		...columnDefs.fixed.map(column => column.alias || column.factor.label || column.factor.name),
// 		...columnDefs.data.map(column => column.alias || column.factor.label || column.factor.name)
// 	].join('\t');
// 	const body = data.data.map((row, rowIndex) => `${rowIndex + 1}\t${row.join('\t')}`).join('\n');
// 	const content = `${header}\n${body}\n`;
// 	const link = document.createElement('a');
// 	link.href = 'data:text/csv;charset=utf-8,' + encodeURI(content);
// 	link.target = '_blank';
// 	//provide the name for the CSV file to be downloaded
// 	link.download = `${subject.name}-Page${data.pageNumber}-TotalItemCount${data.data.length}-${dayjs().format('YYYYMMDDHHmmss')}.csv`;
// 	link.click();
// };
