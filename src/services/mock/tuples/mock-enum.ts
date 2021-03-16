import { DataPage } from '../../query/data-page';
import { Enum } from '../../tuples/enum-types';
import { QueryEnum, QueryEnumForHolder } from '../../tuples/query-enum-types';
import { isFakedUuid } from '../../tuples/utils';
import { getCurrentTime } from '../../utils';

export const listMockEnums = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryEnum>> => {
	const { pageNumber = 1, pageSize = 9 } = options;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [ {
					enumId: '1', name: 'Mock State', topicCount: 1, enumCount: 0
				} ],
				itemCount: 1,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const fetchMockEnum = async (enumId: string): Promise<{ enumeration: Enum }> => {
	if (enumId === '1') {
		const enumeration: Enum = {
			enumId: '1',
			name: 'Mock State',
			items: [
				{ code: '001', label: 'New York' },
				{ code: '002', label: 'Maine' },
				{ code: '003', label: 'New Hampshire' },
				{ code: '004', label: 'Vermont' },
				{ code: '005', label: 'Rhode Island' },
				{ code: '006', label: 'Connecticut' },
				{ code: '007', label: 'Massachusetts' }
			],
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		};
		return { enumeration };
	} else {
		const enumeration: Enum = {
			enumId: '2',
			name: 'Mock Country',
			items: [
				{ code: '001', label: 'United States' },
				{ code: '002', label: 'Japan' }
			],
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		};
		return { enumeration };
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
					{ enumId: '2', name: 'Mock Country' },
					{ enumId: '1', name: 'Mock State' }
				]
			);
		}, 500);
	});
};