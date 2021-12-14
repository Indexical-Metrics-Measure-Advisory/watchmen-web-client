import {TuplePage} from '../../query/tuple-page';
import {Enum, EnumId} from '../../tuples/enum-types';
import {QueryEnum, QueryEnumForHolder} from '../../tuples/query-enum-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

export const MOCK_ENUM_COUNTRY_ID = '1';
export const MOCK_ENUM_STATE_ID = '2';
export const MOCK_ENUM_CITY_ID = '3';
export const MOCK_ENUM_GENDER_ID = '4';

export const listMockEnums = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryEnum>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						enumId: MOCK_ENUM_CITY_ID,
						name: 'Mock City',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						enumId: MOCK_ENUM_COUNTRY_ID,
						name: 'Mock Country',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						enumId: MOCK_ENUM_GENDER_ID,
						name: 'Mock Gender',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						enumId: MOCK_ENUM_STATE_ID,
						name: 'Mock State',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					}
				],
				itemCount: 1,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const fetchMockEnum = async (enumId: EnumId): Promise<{ enumeration: Enum }> => {
	if (enumId === MOCK_ENUM_STATE_ID) {
		const enumeration: Enum = {
			enumId: MOCK_ENUM_STATE_ID,
			name: 'Mock State',
			parentEnumId: '2',
			items: [
				{code: '001', label: 'New York'},
				{code: '002', label: 'Maine'},
				{code: '003', label: 'New Hampshire'},
				{code: '004', label: 'Vermont'},
				{code: '005', label: 'Rhode Island'},
				{code: '006', label: 'Connecticut'},
				{code: '007', label: 'Massachusetts'}
			],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		};
		return {enumeration};
	} else if (enumId === MOCK_ENUM_COUNTRY_ID) {
		const enumeration: Enum = {
			enumId: MOCK_ENUM_COUNTRY_ID,
			name: 'Mock Country',
			items: [
				{code: '001', label: 'United States'},
				{code: '002', label: 'Japan'}
			],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		};
		return {enumeration};
	} else if (enumId === MOCK_ENUM_CITY_ID) {
		const enumeration: Enum = {
			enumId: MOCK_ENUM_CITY_ID,
			name: 'Mock City',
			items: [
				{code: '001', label: 'New York City'},
				{code: '002', label: 'Portland'},
				{code: '003', label: 'Manchester'},
				{code: '004', label: 'Burlington'},
				{code: '005', label: 'Providence'},
				{code: '006', label: 'Bridgeport'},
				{code: '007', label: 'Boston'}
			],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		};
		return {enumeration};
	} else {
		const enumeration: Enum = {
			enumId: MOCK_ENUM_GENDER_ID,
			name: 'Mock Gender',
			items: [
				{code: 'F', label: 'Female'},
				{code: 'M', label: 'Male'}
			],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		};
		return {enumeration};
	}
};

let newEnumId = 10000;
export const saveMockEnum = async (enumeration: Enum): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(enumeration)) {
			enumeration.enumId = `${newEnumId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const listMockEnumsForHolder = async (): Promise<Array<QueryEnumForHolder>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				[
					{enumId: '2', name: 'Mock Country'},
					{enumId: '3', name: 'Mock Gender'},
					{enumId: '1', name: 'Mock State'}
				]
			);
		}, 500);
	});
};