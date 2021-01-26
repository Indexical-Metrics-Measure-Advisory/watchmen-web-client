export enum FactorType {
	SEQUENCE = 'sequence',
	NUMBER = 'number',
	TEXT = 'text',
	DATETIME = 'datetime',
	BOOLEAN = 'boolean',
	ENUM = 'enum',
	OBJECT = 'object',
	ARRAY = 'array',
}

export interface Factor {
	factorId: string;
	name: string;
	type: FactorType;
	label: string;
	description?: string;
}