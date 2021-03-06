import parseCSV from 'csv-parse';
import {EnumItem} from '../../../services/tuples/enum-types';

const asEnumItems = async (data: any): Promise<Array<EnumItem>> => {
	if (data == null || !Array.isArray(data) || data.length === 0) {
		console.error('Cannot parse data to enum items.', data);
		throw new Error('Parsed data is not an array.');
	}

	return data;
};

export const parseFromCsv = async (content: string): Promise<Array<EnumItem>> => {
	return new Promise((resolve, reject) => {
		parseCSV(content, {
			columns: true,
			comment: '#',
			skipEmptyLines: true,
			skipLinesWithError: true,
			skipLinesWithEmptyValues: true,
			trim: true,
			autoParse: true,
			autoParseDate: true
		}, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			try {
				resolve(asEnumItems(data));
			} catch (e) {
				reject(e);
			}
		});
	});
};

export const parseFromJson = async (content: string): Promise<Array<EnumItem>> => {
	return new Promise((resolve, reject) => {
		try {
			const data = JSON.parse(content);
			try {
				resolve(asEnumItems(data));
			} catch (e) {
				reject(e);
			}
		} catch (e) {
			console.group('Error occurred on parse JSON.');
			console.error(e);
			console.groupEnd();
			reject(e);
		}
	});
};