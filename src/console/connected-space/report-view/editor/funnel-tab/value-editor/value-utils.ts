import {ReportFunnel} from '@/services/data/tuples/report-types';
import {CALENDAR_DATE_FORMAT} from '@/widgets/basic/calendar';
import {DropdownOption} from '@/widgets/basic/types';
import dayjs from 'dayjs';

export const tryCastToNumeric = (value?: string): number | undefined => {
	const numberValue = value ? parseFloat(value) : (void 0);
	return isNaN(numberValue as any) ? (void 0) : numberValue;
};

export const getAsString = (funnel: ReportFunnel): string | undefined => {
	if (funnel.values == null || funnel.values[0] == null) {
		return (void 0);
	}

	return funnel.values[0];
};
export const getAsNumeric = (funnel: ReportFunnel): number | undefined => {
	if (funnel.values == null || funnel.values[0] == null) {
		return (void 0);
	}
	try {
		return Number(funnel.values[0]);
	} catch {
		return (void 0);
	}
};
export const getAsDate = (funnel: ReportFunnel): string | undefined => {
	if (funnel.values == null || funnel.values[0] == null) {
		return (void 0);
	}
	try {
		if (funnel.values[0].trim().length === 0) {
			return (void 0);
		}
		const date = dayjs(funnel.values[0]);
		if (date.isValid()) {
			return date.format(CALENDAR_DATE_FORMAT);
		} else {
			return (void 0);
		}
	} catch {
		return (void 0);
	}
};

export const tryToWriteAsNumeric = (funnel: ReportFunnel, value?: string): { changed: boolean, value?: number } => {
	const newValue = tryCastToNumeric(value);
	const orgValue = getAsNumeric(funnel);
	switch (true) {
		case newValue == null && orgValue == null:
			delete funnel.values;
			return {changed: false};
		case newValue == null && orgValue != null:
			delete funnel.values;
			return {changed: true};
		case orgValue == null || newValue !== orgValue:
			funnel.values = [`${newValue}`];
			return {changed: true, value: newValue};
		default:
			funnel.values = [`${newValue}`];
			return {changed: false, value: newValue};
	}
};

export const onNumericValueChange = (funnel: ReportFunnel, onChange: () => void) => (value?: string): number | undefined => {
	const {changed, value: newValue} = tryToWriteAsNumeric(funnel, value);
	if (changed) {
		onChange();
	}
	return newValue;
};

export const onDropdownValueChange = (funnel: ReportFunnel, onChange: () => void) => (option: DropdownOption) => {
	const orgValue = getAsString(funnel);
	const newValue = option.value as string;
	if (newValue === '') {
		delete funnel.values;
	} else {
		funnel.values = [newValue];
	}
	// eslint-disable-next-line
	if (newValue != orgValue) {
		onChange();
	}
};

export const onDateValueChange = (funnel: ReportFunnel, onChange: () => void) => (value?: string) => {
	const orgValue = getAsString(funnel);
	if (!value) {
		delete funnel.values;
	} else {
		funnel.values = [value];
	}
	// eslint-disable-next-line
	if (value != orgValue) {
		onChange();
	}
};