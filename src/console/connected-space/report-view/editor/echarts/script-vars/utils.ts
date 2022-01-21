import {
	BooleanItem,
	ColorItem,
	DefItem,
	DropdownItem,
	ItemType,
	NumberItem,
	PercentageItem,
	SectionItem,
	TextItem
} from '@/services/data/tuples/echarts/echarts-script-types';

export const isSectionItem = (item: DefItem): item is SectionItem => {
	return item.type === ItemType.SECTION;
};

export const isNumberItem = (item: DefItem): item is NumberItem => {
	return item.type === ItemType.NUMBER;
};
export const isPercentageItem = (item: DefItem): item is PercentageItem => {
	return item.type === ItemType.PERCENTAGE;
};
export const isBooleanItem = (item: DefItem): item is BooleanItem => {
	return item.type === ItemType.BOOLEAN;
};
export const isTextItem = (item: DefItem): item is TextItem => {
	return item.type === ItemType.TEXT;
};
export const isColorItem = (item: DefItem): item is ColorItem => {
	return item.type === ItemType.COLOR;
};
export const isDropdownItem = (item: DefItem): item is DropdownItem => {
	return item.type === ItemType.DROPDOWN;
};