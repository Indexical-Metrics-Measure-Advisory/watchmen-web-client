import {FindBy} from '@/services/data/admin/logs';

export const toDisplayValue = (value?: any): string => {
	let displayValue;
	if (value === void 0) {
		displayValue = 'Not be logged';
	} else if (value == null) {
		displayValue = 'null';
	} else {
		displayValue = JSON.stringify(value, null, 2);
	}
	return displayValue;
};

export const toDisplayBy = (by?: FindBy): string => {
	let displayBy;
	if (by === void 0) {
		displayBy = 'Not be logged';
	} else if (by == null) {
		displayBy = 'null';
	} else if (typeof by === 'object') {
		const {tenant_id_, tenantId, ...data} = by;
		displayBy = JSON.stringify(data, null, 2);
	} else {
		displayBy = `${by}`;
	}
	return displayBy;
};