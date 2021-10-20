import {CompatibleEncryptMethods, Factor, FactorEncryptMethod, FactorType} from '@/services/data/tuples/factor-types';
import {isEnumFactor} from '@/services/data/tuples/topic';
import {Topic} from '@/services/data/tuples/topic-types';
import parseCSV from 'csv-parse';
import {createFactor, createTopic, isFactorCanBeFlatten} from '../utils';

const ValidIndexGroups = [
	...new Array(10).fill(1).map((_, index) => `i-${index + 1}`),
	...new Array(10).fill(1).map((_, index) => `u-${index + 1}`)
];
const isIndexGroupValid = (indexGroup?: string): boolean => {
	return !indexGroup || ValidIndexGroups.includes(indexGroup);
};
const asFactors = async (topic: Topic, data: any): Promise<Array<Factor>> => {
	if (data == null || !Array.isArray(data) || data.length === 0) {
		console.error('Cannot parse data to factors.', data);
		throw new Error('Parsed data is not an array.');
	}

	const mockTopic = createTopic();
	// const columnMap: Map<string, Factor> = new Map();
	return data.reduce<Array<Factor>>((columns, row) => {
		const factor = createFactor(mockTopic);

		factor.name = `${row.name || ''}`;
		factor.label = row.label ? `${row.label}` : factor.name;
		factor.type = row.type ? (`${row.type}` as FactorType) : FactorType.TEXT;
		if (Object.values(FactorType).includes(`${factor.type}`.toLowerCase() as FactorType)) {
			factor.type = `${factor.type}`.toLowerCase() as FactorType;
		} else {
			factor.type = FactorType.TEXT;
		}
		if (isEnumFactor(factor.type)) {
			factor.enumId = row.enumId ? `${row.enumId}` : (void 0);
		}
		factor.defaultValue = row.defaultValue ? `${row.defaultValue}` : (void 0);
		factor.indexGroup = row.indexGroup ? `${row.indexGroup}` : (void 0);
		if (!isIndexGroupValid(factor.indexGroup)) {
			delete factor.indexGroup;
		}
		factor.flatten = row.flatten === true ? true : (`${row.flatten}`.toLowerCase() === 'true');
		if (!isFactorCanBeFlatten(topic, factor)) {
			delete factor.flatten;
		}
		factor.encrypt = row.encrypt ? (`${row.encrypt}` as FactorEncryptMethod) : (void 0);
		if (Object.values(FactorEncryptMethod).includes(`${factor.encrypt}`.toUpperCase() as FactorEncryptMethod)) {
			factor.encrypt = `${factor.encrypt}`.toUpperCase() as FactorEncryptMethod;
			if (!CompatibleEncryptMethods[factor.type].includes(factor.encrypt)) {
				delete factor.encrypt;
			}
		} else {
			delete factor.encrypt;
		}

		factor.description = `${row.description || ''}`;

		columns.push(factor);
		return columns;
	}, []);
};

export const parseFromCsv = async (topic: Topic, content: string): Promise<Array<Factor>> => {
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
				resolve(asFactors(topic, data));
			} catch (e: any) {
				reject(e);
			}
		});
	});
};

export const parseFromJson = async (topic: Topic, content: string): Promise<Array<Factor>> => {
	return new Promise((resolve, reject) => {
		try {
			const data = JSON.parse(content);
			try {
				resolve(asFactors(topic, data));
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