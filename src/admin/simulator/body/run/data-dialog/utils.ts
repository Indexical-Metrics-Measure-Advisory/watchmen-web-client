export const toString = (any: any): string => {
	if (any == null) {
		return '';
	} else if (typeof any === 'string') {
		return any;
	} else if (typeof any === 'number') {
		return `${any}`;
	} else if (typeof any === 'boolean') {
		return `${any}`;
	} else {
		return JSON.stringify(any);
	}
};