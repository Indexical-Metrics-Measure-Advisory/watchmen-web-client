import {EnumItem} from '@/services/data/tuples/enum-types';

export enum SortType {
	CODE = 'code',
	NAME = 'name'
}

export const renderByCodeFirst = (item: EnumItem): string => {
	return `${item.code ?? 'No Code'} - ${item.label ?? 'Noname Enum Item'}`;
};

export const renderByNameFirst = (item: EnumItem): string => {
	return `${item.label ?? 'Noname Enum Item'} - ${item.code ?? 'No Code'}`;
};

export const renderBySortType = (sortType: SortType, code: string, item?: EnumItem): string => {
	if (item == null) {
		return code;
	}
	if (sortType === SortType.CODE) {
		return renderByCodeFirst(item);
	} else if (sortType === SortType.NAME) {
		return renderByNameFirst(item);
	} else {
		return renderByNameFirst(item);
	}
};
