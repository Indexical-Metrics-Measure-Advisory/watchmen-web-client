import dayjs from 'dayjs';
import { DataSetPage } from '../../console/dataset';

export const fetchMockSubjectData = async (options: {
	subjectId: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataSetPage<Array<any>>> => {
	const { pageNumber = 1, pageSize = 100 } = options;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				itemCount: 223,
				pageNumber,
				pageSize,
				pageCount: 3,
				data: new Array(pageNumber === 3 ? 23 : 100).fill(1).map((row, rowIndex) => {
					const index = `${(pageNumber - 1) * pageSize + rowIndex + 1}`.padStart(5, '0');
					const quoteDate = dayjs()
						.subtract(1, 'year')
						.subtract(Math.floor(Math.random() * 30), 'day');
					const issueDate = quoteDate.add(Math.floor(Math.random() * 30), 'day');
					return [
						`Q${index}`,
						quoteDate.format('YYYY/MM/DD'),
						true,
						`P${index}`,
						issueDate.format('YYYY/MM/DD'),
						10000,
						'John Doe',
						'1985/02/13',
						'M',
						'AU'
					];
				})
			});
		}, 500);
	});
};