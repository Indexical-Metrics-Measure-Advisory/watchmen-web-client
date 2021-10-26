import {DefItem, ItemType, NumberItem, SectionItem} from './types';

export const isSectionItem = (item: DefItem): item is SectionItem => {
	return item.type === ItemType.SECTION;
};

export const isNumberItem = (item: DefItem): item is NumberItem => {
	return item.type === ItemType.NUMBER;
};
