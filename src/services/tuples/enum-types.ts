import {Tuple} from './tuple-types';

export interface EnumItem {
	code: string;
	label: string;
	replaceCode?: string;
	parentCode?: string;
}

export interface Enum extends Tuple {
	enumId: string;
	name: string;
	description?: string;
	parentEnumId?: string;
	items: Array<EnumItem>;
}
