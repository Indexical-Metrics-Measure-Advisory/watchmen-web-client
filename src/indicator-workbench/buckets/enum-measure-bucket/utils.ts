import {EnumId, EnumItem} from '@/services/data/tuples/enum-types';
import {SortType} from '../bucket-event-bus-types';

export interface EnumItems {
	enumId: EnumId;
	items: Record<string, EnumItem>;
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
