import { Enum } from '../../services/tuples/enum-types';

export enum EnumEventTypes {
	ENUM_NAME_CHANGED = 'enum-name-changed',
	ENUM_DESCRIPTION_CHANGED = 'enum-description-changed',
	ENUM_PARENT_CHANGED = 'enum-parent-changed',

	ITEMS_IMPORTED = 'items-imported'
}

export interface EnumEventBus {
	fire(type: EnumEventTypes.ENUM_NAME_CHANGED, enumeration: Enum): this;
	on(type: EnumEventTypes.ENUM_NAME_CHANGED, listener: (enumeration: Enum) => void): this;
	off(type: EnumEventTypes.ENUM_NAME_CHANGED, listener: (enumeration: Enum) => void): this;

	fire(type: EnumEventTypes.ENUM_DESCRIPTION_CHANGED, enumeration: Enum): this;
	on(type: EnumEventTypes.ENUM_DESCRIPTION_CHANGED, listener: (enumeration: Enum) => void): this;
	off(type: EnumEventTypes.ENUM_DESCRIPTION_CHANGED, listener: (enumeration: Enum) => void): this;

	fire(type: EnumEventTypes.ENUM_PARENT_CHANGED, enumeration: Enum): this;
	on(type: EnumEventTypes.ENUM_PARENT_CHANGED, listener: (enumeration: Enum) => void): this;
	off(type: EnumEventTypes.ENUM_PARENT_CHANGED, listener: (enumeration: Enum) => void): this;

	fire(type: EnumEventTypes.ITEMS_IMPORTED, enumeration: Enum): this;
	on(type: EnumEventTypes.ITEMS_IMPORTED, listener: (enumeration: Enum) => void): this;
	off(type: EnumEventTypes.ITEMS_IMPORTED, listener: (enumeration: Enum) => void): this;
}