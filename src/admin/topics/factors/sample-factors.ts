import {FactorEncryptMethod, FactorType} from '@/services/data/tuples/factor-types';
import {stringify} from 'csv-stringify/dist/esm/sync';

export const SAMPLE_FACTORS_JSON = [
	{
		'name': 'Name of factor, in snake case or camel case',
		'label': 'Label of factor',
		'type': Object.values(FactorType).join('|'),
		'enumId': 'Fill with enumId (ask your administrator), or delete this property when type is not an enumeration',
		'defaultValue': 'Appropriate value of given factor type, or delete this property when no default value',
		'indexGroup': 'Use "i-1"~"i-10" for index, or "u-1"~"u-10" for unique index, or delete property when no index designated',
		'flatten': 'Boolean value(in sample is string, just for describe how to use it), or delete property in non-raw topic or non-flatten',
		'encrypt': `${Object.values(FactorEncryptMethod).filter(x => x !== FactorEncryptMethod.NONE).join('|')}, or delete this property when no encryption`,
		'description': 'Delete this property when no description'
	},
	{
		'name': 'Factor.Name1',
		'label': 'Factor Label 1',
		'type': 'text',
		'indexGroup': 'i-1',
		'flatten': false
	},
	{
		'name': 'Factor.Name2',
		'label': 'Factor Label 2',
		'type': 'text',
		'indexGroup': 'i-1',
		'flatten': true
	}
];
export const SAMPLE_FACTORS_CSV = stringify(SAMPLE_FACTORS_JSON, {
	columns: ['name', 'label', 'type', 'enumId', 'defaultValue', 'indexGroup', 'flatten', 'encrypt', 'description'],
	header: true
});