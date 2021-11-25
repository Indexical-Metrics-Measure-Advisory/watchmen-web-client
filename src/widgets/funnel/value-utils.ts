import {ReportFunnel} from '@/services/data/tuples/report-types';
import {isXaNumber} from '@/services/utils';
import dayjs from 'dayjs';
import {CALENDAR_DATE_FORMAT} from '../basic/calendar';
import {DropdownOption} from '../basic/types';

export const tryCastToNumeric = (value?: string): number | undefined => {
	return isXaNumber(value) ? Number(value) : (void 0);
};

export const getAsString = (funnel: ReportFunnel, index: number): string | undefined => {
	if (funnel.values == null || funnel.values[index] == null) {
		return (void 0);
	}

	return funnel.values[index] || (void 0);
};
export const getAsNumeric = (funnel: ReportFunnel, index: number): number | undefined => {
	if (funnel.values == null || funnel.values[index] == null) {
		return (void 0);
	}
	try {
		return Number(funnel.values[index]);
	} catch {
		return (void 0);
	}
};
export const getAsDate = (funnel: ReportFunnel, index: number): string | undefined => {
	if (funnel.values == null || funnel.values[index] == null) {
		return (void 0);
	}
	try {
		if ((funnel.values[index] || '').trim().length === 0) {
			return (void 0);
		}
		const date = dayjs(funnel.values[index]);
		if (date.isValid()) {
			return date.format(CALENDAR_DATE_FORMAT);
		} else {
			return (void 0);
		}
	} catch {
		return (void 0);
	}
};

const tryToWriteValues = (funnel: ReportFunnel, index: number, value?: string): boolean => {
	funnel.values = funnel.values || [];
	const oldValue = getAsString(funnel, index);
	switch (true) {
		case (value == null || value === '') && (oldValue == null || oldValue === ''):
			// both null/empty
			funnel.values[index] = null;
			return false;
		case (value == null || value === '') && (oldValue != null && oldValue !== ''):
			// new value is null/empty, old value is not
			funnel.values[index] = null;
			return true;
		case (oldValue == null || oldValue === ''):
			// new value is not null/empty, old value is
			funnel.values[index] = value!;
			return true;
		default:
			// both not null/empty
			funnel.values[index] = value!;
			// eslint-disable-next-line
			return value != oldValue;
	}
};

export const onNumericValueChange = (funnel: ReportFunnel, index: number, onChange: () => void) => (value?: string): number | undefined => {
	if (tryToWriteValues(funnel, index, value)) {
		onChange();
	}
	return tryCastToNumeric(value);
};

export const onDropdownValueChange = (funnel: ReportFunnel, index: number, onChange: () => void) => (option: DropdownOption) => {
	if (tryToWriteValues(funnel, index, option.value)) {
		onChange();
	}
};

export const onDateValueChange = (funnel: ReportFunnel, index: number, onChange: () => void) => (value?: string) => {
	if (tryToWriteValues(funnel, index, value)) {
		onChange();
	}
};