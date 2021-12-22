import {parse as parseCSV} from 'csv-parse/dist/esm';
import {ColumnDefs, DataPage} from '../types';

const verify = (data: any, columnDefs: ColumnDefs): DataPage => {
	if (!Array.isArray(data)) {
		throw new Error('Dataset must be an array.');
	}

	return {
		data: data.map(row => {
			return [...columnDefs.fixed, ...columnDefs.data].map(columnDef => {
				return row[columnDef.name];
			});
		}).filter(row => {
			// eslint-disable-next-line
			return row.every(cell => cell != null && cell.toString().trim().length !== 0);
		}),
		itemCount: data.length,
		pageNumber: 1,
		pageSize: data.length,
		pageCount: 1
	};
};
export const parseFromCsv = async (content: string, columnDefs: ColumnDefs): Promise<DataPage> => {
	return new Promise((resolve, reject) => {
		parseCSV(content, {
			columns: true,
			comment: '#',
			skipEmptyLines: true,
			skipRecordsWithError: true,
			skipRecordsWithEmptyValues: true,
			trim: true,
			autoParse: true,
			autoParseDate: true
		}, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			try {
				resolve(verify(data, columnDefs));
			} catch (e: any) {
				reject(e);
			}
		});
	});
};

export const parseFromJson = async (content: string, columnDefs: ColumnDefs): Promise<DataPage> => {
	return new Promise((resolve, reject) => {
		try {
			const data = JSON.parse(content);
			try {
				resolve(verify(data, columnDefs));
			} catch (e: any) {
				reject(e);
			}
		} catch (e: any) {
			console.group('Error occurred on parse JSON.');
			console.error(e);
			console.groupEnd();
			reject(e);
		}
	});
};