import dayjs, {Dayjs} from 'dayjs';

export const noop = () => (void 0);
export const base64Encode = (str: string): string => {
	return Buffer.from(str, 'utf-8').toString('base64');
};

export const base64Decode = (str: string): string => {
	return Buffer.from(str, 'base64').toString('utf-8');
};

export const computeWeekOf = (date: string | Dayjs, unit: 'year' | 'month'): number => {
	// get first day of this unit
	// year: 01/01
	// month: month/01
	const firstDayOfUnit = dayjs(date).startOf(unit);
	// weekday is 0-6, convert to 1-7 here. now if the first day of unit is
	// 1. sunday: result is 1,
	// 2. monday: result is 2,
	// 3. tuesday: result is 3,
	// 4. wednesday: result is 4,
	// 5. thursday: result is 5,
	// 6. friday: result is 6,
	// 7. saturday: result is 7
	const firstDayWeekday = firstDayOfUnit.day() + 1;
	// compute days of first week. now if the first day of unit is
	// 1. sunday: 0 day in first week
	// 2. monday: 6 days in first week
	// 3. tuesday: 5 days in first week
	// 4. wednesday: 4 days in first week
	// 5. thursday: 3 days in first week
	// 6. friday: 2 days in first week
	// 7. saturday: 1 days in first week
	const firstWeekDays = (8 - firstDayWeekday) % 7;

	const thisDay = dayjs(date);
	// compute days between given date and first day of unit
	// eg. given date is 2021/01/02, then result is 1
	const daysDiff = thisDay.diff(firstDayOfUnit, 'day', false);
	if (daysDiff < firstWeekDays) {
		// this is first/zero week, always is not a whole week
		// 1. from first day of unit, there are firstWeekDays in first week
		// 2. because of first day of unit is not count in daysDiff,
		//    which means "daysDiff <= firstWeekDays - 1" equals given date is in first week
		// 3. also because if the first day of unit is sunday equals there is zero day in first week,
		//    any daysDiff could not fulfill the "daysDiff <= 0 - 1",
		//    so in this case, week starts from 1, and will not enter this logic branch.
		return 0;
	} else {
		// if not in first partial week, subtract firstWeekDays and simply divide 7 to get weeks.
		// eg 1.
		//   first day of unit is monday, 6 days in first week(#0)
		//   given date is 7th day in unit, daysDiff is 6 => (6 - 6 + 1) / 7 => week #1
		//   given date is 8th/9th/10th/11th/12th day in unit, daysDiff is 7/8/9/10/11 => (7/8/9/10/11 - 6 + 1) / 7 => week #1
		//   given date is 13th day in unit, daysDiff is 12 => (12 - 6 + 1) / 7 => week #1
		//   given date is 14th day in unit, daysDiff is 13 => (13 - 6 + 1) / 7 => week #2
		return Math.ceil((daysDiff - firstWeekDays + 1) / 7);
	}
};

const hierarchicalNameSplitting = /[_.]/;
const nonHierarchicalNameSplitting = /_/;
export const againstSnakeCaseName = (name: string, hierarchical: boolean = false) => {
	return /^\d.*$/.test(name)
		|| name.split(hierarchical ? hierarchicalNameSplitting : nonHierarchicalNameSplitting)
			.some(part => !/^[A-Za-z0-9]+$/.test(part));
};

export const isXaNumber = (x: any, negative: boolean = true): boolean => {
	if (x == null) {
		return false;
	}
	let testValue;
	if (x.toString && typeof x.toString === 'function') {
		testValue = x.toString();
	} else {
		testValue = `${x}`;
	}

	if (negative) {
		return /^(-?)[0-9]+(.[0-9]*)?$/.test(testValue);
	} else {
		return /^[0-9]+(.[0-9]*)?$/.test(testValue);
	}
};

export const formatToKGB = (x: number): string => {
	if (x >= 1_000_000_000) {
		return (x / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
	}
	if (x >= 1_000_000) {
		return (x / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
	}
	if (x >= 1_000) {
		return (x / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
	}
	return `${x}`;
};