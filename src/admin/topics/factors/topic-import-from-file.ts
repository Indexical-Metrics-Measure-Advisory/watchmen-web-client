import {Factor, FactorType} from '@/services/data/tuples/factor-types';
import parseCSV from 'csv-parse';
import {createFactor, createTopic} from '../utils';

const asFactors = async (data: any): Promise<Array<Factor>> => {
	if (data == null || !Array.isArray(data) || data.length === 0) {
		console.error('Cannot parse data to factors.', data);
		throw new Error('Parsed data is not an array.');
	}

	const mockTopic = createTopic();
	const columnMap: Map<string, Factor> = new Map();
	return data.reduce<Array<Factor>>((columns, row) => {
		Object.keys(row)
			.forEach(name => {
				let factor = columnMap.get(name);
				if (!factor) {
					factor = createFactor(mockTopic);
					mockTopic.factors.push(factor);
					factor.name = name;
					columnMap.set(name, factor);
					columns.push(factor);
				}
				if (factor.type === FactorType.TEXT) {
					// already detected as text
					return;
				}
				const value = row[name];
				if ((typeof value === 'number' || !isNaN(Number(value))) && !factor.type) {
					factor.type = FactorType.NUMBER;
				} else if ((typeof value === 'boolean' || value.toLowerCase() === 'true' || value.toLowerCase() === 'false') && !factor.type) {
					factor.type = FactorType.BOOLEAN;
				} else {
					factor.type = FactorType.TEXT;
				}
			});
		return columns;
	}, []);
};

export const parseFromCsv = async (content: string): Promise<Array<Factor>> => {
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
				resolve(asFactors(data));
			} catch (e: any) {
				reject(e);
			}
		});
	});
};

export const parseFromJson = async (content: string): Promise<Array<Factor>> => {
	return new Promise((resolve, reject) => {
		try {
			const data = JSON.parse(content);
			try {
				resolve(asFactors(data));
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