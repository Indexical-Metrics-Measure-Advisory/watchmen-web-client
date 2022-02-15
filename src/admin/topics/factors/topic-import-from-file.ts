import {isEnumFactor} from '@/services/data/tuples/factor-calculator-utils';
import {
	CompatibleEncryptMethods,
	Factor,
	FactorEncryptMethod,
	FactorId,
	FactorIndexGroup,
	FactorType
} from '@/services/data/tuples/factor-types';
import {Topic, TopicType} from '@/services/data/tuples/topic-types';
import {generateUuid, removeFakeIdPrefix} from '@/services/data/tuples/utils';
import {parse as parseCSV} from 'csv-parse/dist/esm';
import dayjs from 'dayjs';
import {createFactor, createTopic, isFactorCanBeFlatten} from '../utils';

const ValidIndexGroups = [
	...new Array(10).fill(1).map((_, index) => `i-${index + 1}`),
	...new Array(10).fill(1).map((_, index) => `u-${index + 1}`)
];
const isIndexGroupValid = (indexGroup?: string): boolean => {
	return !indexGroup || ValidIndexGroups.includes(indexGroup);
};

type ShouldBeFactorsStructure = any;
const toFactorsFromStructureData = (topic: Topic, data: ShouldBeFactorsStructure): Array<Factor> => {
	if (data == null || !Array.isArray(data) || data.length === 0) {
		console.error('Cannot parse data to factors.', data);
		throw new Error('Parsed data is not an array or no element in factors array.');
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
		factor.indexGroup = row.indexGroup ? (`${row.indexGroup}` as FactorIndexGroup) : (void 0);
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

export const parseFromStructureCsv = async (topic: Topic, content: string): Promise<Array<Factor>> => {
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
				resolve(retrieveOriginalFactorIds(topic.factors, toFactorsFromStructureData(topic, data)));
			} catch (e: any) {
				reject(e);
			}
		});
	});
};

export const parseFromStructureJson = async (topic: Topic, content: string): Promise<Array<Factor>> => {
	return new Promise((resolve, reject) => {
		try {
			const data = JSON.parse(content);
			try {
				resolve(retrieveOriginalFactorIds(topic.factors, toFactorsFromStructureData(topic, data)));
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

type ShouldBeFactorsInstance = any;
const toFactorsFromInstanceData = (topic: Topic, data: ShouldBeFactorsInstance, prefix?: string): Array<Factor> => {
	if (data == null || !Array.isArray(data) || data.length === 0) {
		console.error('Cannot parse data to factors.', data);
		throw new Error('Parsed data is not an array or no element in factors array.');
	}

	const mockTopic = createTopic();
	const factorsMap = data.reduce<Record<string, Factor>>((map, row) => {
		if (typeof row !== 'object' || row == null) {
			// ignore row which is not an object
			return map;
		}

		if (prefix != null) {
			// if there is prefix, create auto-generated id for referring to ancestors
			const ancestors = prefix.split('.');
			if (ancestors.length === 1) {
				// first level sub object/array, do nothing
			} else {
				const ancestorsCount = ancestors.length;
				ancestors.forEach((ancestor, index) => {
					if (index === ancestorsCount - 1) {
						// this is me, ignored.
						return;
					}
					let factorName = `${prefix}.aid_${ancestor}`;
					const tails = ancestors.filter((_, i) => i > index).map(x => x.toUpperCase());
					if (tails.includes(ancestor.toUpperCase())) {
						// there is duplication, eg. a.b.c.b.e, now we are in first "b", and there is another "b" following.
						// use distance as suffix
						factorName = `${factorName}_${ancestorsCount - 1 - index}`;
					}
					const factor = map[factorName] ?? createFactor(mockTopic, true);
					factor.name = factorName;
					factor.type = FactorType.NUMBER;
					const ancestorName = ancestors.filter((_, i) => i <= index).join('.');
					factor.description = `Auto generated id refers to ${ancestorName}.aid_me`;
					map[factorName] = factor;
				});
			}
		}

		Object.keys(row).forEach(name => {
			const factorName = prefix ? `${prefix}.${name}` : name;
			const value = row[name];

			const factor = map[factorName] ?? createFactor(mockTopic, true);

			factor.name = factorName;
			factor.label = '';
			if (value == null) {
				// no value, leave type as empty
			} else if (typeof value === 'number') {
				if (factor.type == null) {
					factor.type = FactorType.NUMBER;
				} else if (factor.type === FactorType.TEXT || factor.type === FactorType.NUMBER) {
					// already read a value of text/number, ignore this number value
				} else {
					throw new Error(`Conflict type[${FactorType.NUMBER}, ${factor.type}] detected on factor[${factorName}].`);
				}
			} else if (typeof value === 'boolean') {
				if (factor.type == null) {
					factor.type = FactorType.BOOLEAN;
				} else if (factor.type === FactorType.BOOLEAN) {
					// already read a value of boolean, ignore this boolean value
				} else {
					throw new Error(`Conflict type[${FactorType.BOOLEAN}, ${factor.type}] detected on factor[${factorName}].`);
				}
			} else if (typeof value === 'string') {
				if (value.trim().length === 23 && isNaN(Number(value.trim()))) {
					const isValidDate = dayjs(value).isValid();
					if (factor.type == null && isValidDate) {
						factor.type = FactorType.FULL_DATETIME;
					} else if (factor.type === FactorType.FULL_DATETIME && isValidDate) {
						// already read a value of full date time, ignore this value
					} else {
						factor.type = FactorType.TEXT;
					}
				} else if (value.trim().length === 19 && isNaN(Number(value.trim()))) {
					const isValidDate = dayjs(value).isValid();
					if (factor.type == null && isValidDate) {
						factor.type = FactorType.DATETIME;
					} else if (factor.type === FactorType.DATETIME && isValidDate) {
						// already read a value of date time, ignore this value
					} else {
						factor.type = FactorType.TEXT;
					}
				} else if (value.trim().length === 10 && isNaN(Number(value.trim()))) {
					const isValidDate = dayjs(value).isValid();
					if (factor.type == null && isValidDate) {
						factor.type = FactorType.DATE;
					} else if (factor.type === FactorType.DATE && isValidDate) {
						// already read a value of date, ignore this value
					} else {
						factor.type = FactorType.TEXT;
					}
				} else if (value.trim().length === 8 && !isNaN(Number(value.trim()))) {
					const isValidDate = dayjs(value).isValid();
					if (factor.type == null && isValidDate) {
						factor.type = FactorType.TIME;
					} else if (factor.type === FactorType.TIME && isValidDate) {
						// already read a value of time, ignore this value
					} else {
						factor.type = FactorType.TEXT;
					}
				} else if (factor.type !== FactorType.OBJECT && factor.type !== FactorType.ARRAY) {
					// any type, should be as a text
					factor.type = FactorType.TEXT;
				} else {
					throw new Error(`Conflict type[${FactorType.TEXT}, ${factor.type}] detected on factor[${factorName}].`);
				}
			} else if (Array.isArray(value)) {
				if (topic.type !== TopicType.RAW) {
					throw new Error(`Type[${FactorType.ARRAY}] detected on factor[${factorName}], is not allowed in a non-raw topic.`);
				} else if (factor.type == null) {
					factor.type = FactorType.ARRAY;
				} else if (factor.type === FactorType.ARRAY) {
					// already read a value of array, ignore this value
				} else {
					// console.log(value, factor.type);
					throw new Error(`Conflict type[${FactorType.ARRAY}, ${factor.type}] detected on factor[${factorName}].`);
				}
				if (value.length !== 0) {
					{
						// create aid_me factor to identify myself
						const factorName = `${prefix}.aid_me`;
						const factor = map[factorName] ?? createFactor(mockTopic, true);
						factor.name = factorName;
						factor.type = FactorType.NUMBER;
						factor.description = 'Auto generated id for sub object referring.';
						map[factorName] = factor;
					}
					{
						// create aid_root factor to reference to root
						const factorName = `${prefix}.aid_root`;
						const factor = map[factorName] ?? createFactor(mockTopic, true);
						factor.name = factorName;
						factor.type = FactorType.NUMBER;
						factor.description = 'Auto generated id for reference to root.';
						map[factorName] = factor;
					}
					toFactorsFromInstanceData(topic, value, factorName).forEach(factor => {
						map[factor.name] = factor;
					});
				}
			} else if (typeof value === 'object') {
				if (topic.type !== TopicType.RAW) {
					throw new Error(`Type[${FactorType.OBJECT}] detected on factor[${factorName}], is not allowed in a non-raw topic.`);
				} else if (factor.type == null) {
					factor.type = FactorType.OBJECT;
				} else if (factor.type === FactorType.OBJECT) {
					// already read a value of object, ignore this value
				} else {
					throw new Error(`Conflict type[${FactorType.OBJECT}, ${factor.type}] detected on factor[${factorName}].`);
				}
				{
					// create aid_me factor to identify myself
					const factorName = `${prefix}.aid_me`;
					const factor = map[factorName] ?? createFactor(mockTopic, true);
					factor.name = factorName;
					factor.type = FactorType.NUMBER;
					factor.description = 'Auto generated id for sub object.';
					map[factorName] = factor;
				}
				{
					// create aid_root factor to reference to root
					const factorName = `${prefix}.aid_root`;
					const factor = map[factorName] ?? createFactor(mockTopic, true);
					factor.name = factorName;
					factor.type = FactorType.NUMBER;
					factor.description = 'Auto generated id for reference to root.';
					map[factorName] = factor;
				}
				toFactorsFromInstanceData(topic, [value], factorName).forEach(factor => {
					map[factor.name] = factor;
				});
			}

			map[factorName] = factor;
		});

		return map;
	}, {} as Record<string, Factor>);

	return Object.values(factorsMap).sort((f1, f2) => {
		return f1.name.localeCompare(f2.name, void 0, {sensitivity: 'base', caseFirst: 'upper'});
	}).map(factor => {
		factor.type = factor.type ?? FactorType.TEXT;
		return factor;
	});
};

const createAidRootFactor = (): Factor => {
	const factorName = `aid_me`;
	const factor = createFactor(createTopic(), true);
	factor.name = factorName;
	factor.type = FactorType.NUMBER;
	factor.description = 'Auto generated id for root.';
	return factor;
};

export const parseFromInstanceJson = async (topic: Topic, content: string): Promise<Array<Factor>> => {
	return new Promise((resolve, reject) => {
		try {
			const data = JSON.parse(content);
			try {
				const factors = toFactorsFromInstanceData(topic, data);
				if (topic.type === TopicType.RAW) {
					resolve(retrieveOriginalFactorIds(topic.factors, [...factors, createAidRootFactor()]));
				} else {
					resolve(retrieveOriginalFactorIds(topic.factors, factors));
				}
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

const retrieveOriginalFactorIds = (originalFactors: Array<Factor>, createdFactors: Array<Factor>): Array<Factor> => {
	const originalMapByName: { [key in string]: Factor } = originalFactors.reduce((map, factor) => {
		map[(factor.name || '').trim()] = factor;
		return map;
	}, {} as { [key in string]: Factor });
	const originalMapById: { [key in FactorId]: Factor } = originalFactors.reduce((map, factor) => {
		map[`${factor.factorId}`] = factor;
		return map;
	}, {} as { [key in FactorId]: Factor });
	createdFactors.forEach(createdFactor => {
		const originalFactor = originalMapByName[(createdFactor.name || '').trim()];
		if (originalFactor != null) {
			// name is duplicated
			createdFactor.factorId = originalFactor.factorId;
		} else if (originalMapById[`${createdFactor.factorId}`] != null) {
			// id is duplicated
			let newFactorId = removeFakeIdPrefix(generateUuid());
			while (originalMapById[`${newFactorId}`] != null) {
				newFactorId = removeFakeIdPrefix(generateUuid());
			}
			createdFactor.factorId = newFactorId;
		}
	});
	return createdFactors;
};