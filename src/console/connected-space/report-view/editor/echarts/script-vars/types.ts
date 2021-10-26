import {DropdownOption} from '@/widgets/basic/types';

export enum ItemType {
	SECTION = 'section',
	NUMBER = 'number',
	PERCENTAGE = 'percentage',
	BOOLEAN = 'boolean',
	TEXT = 'text',
	COLOR = 'color',
	DROPDOWN = 'dropdown'
}

export interface DefItem {
	type: ItemType;
	label: string;
}

export interface SectionItem extends DefItem {
	type: ItemType.SECTION;
}

export interface InputItem extends DefItem {
	key: string;
}

export interface NumberItem extends InputItem {
	type: ItemType.NUMBER;
	placeholder?: string;
	unit?: string;
}

export interface PercentageItem extends InputItem {
	type: ItemType.PERCENTAGE;
	placeholder?: string;
}

export interface BooleanItem extends InputItem {
	type: ItemType.BOOLEAN;
}

export interface TextItem extends InputItem {
	type: ItemType.TEXT;
	placeholder?: string;
}

export interface ColorItem extends InputItem {
	type: ItemType.COLOR;
}

export interface DropdownItem extends InputItem {
	type: ItemType.DROPDOWN;
	placeholder?: string;
	options: Array<DropdownOption>;
}