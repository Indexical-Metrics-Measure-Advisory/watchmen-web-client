import {Dayjs} from 'dayjs';

const getLastDateOfMonth = (year: number, month: number): 28 | 29 | 30 | 31 => {
	switch (month + 1) {
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2:
			return year % 400 === 0 ? 29 : (year % 100 === 0 ? 28 : (year % 4 === 0) ? 29 : 28);
		default:
			return 31;
	}
};

export const computeCalendarDays = (firstDate: Dayjs) => {
	const weekday = firstDate.day();
	const year = firstDate.year();
	const month = firstDate.month();
	const lastDate = getLastDateOfMonth(year, month);
	const days = new Array(lastDate).fill(1).map((v, index) => {
		return {year, month, date: index + 1};
	});
	if (weekday !== 0) {
		const previousMonth = month === 0 ? 11 : (month - 1);
		const previousYear = month === 0 ? (year - 1) : year;
		let previousLastDate = getLastDateOfMonth(previousYear, previousMonth);
		for (let index = weekday - 1; index >= 0; index--) {
			days.unshift({year: previousYear, month: previousMonth, date: previousLastDate--});
		}
	}
	const length = days.length;
	if (length < 42) {
		const nextMonth = month === 11 ? 0 : (month + 1);
		const nextYear = month === 11 ? (year + 1) : year;
		let date = 1;
		for (let index = days.length; index < 42; index++) {
			days.push({year: nextYear, month: nextMonth, date: date++});
		}
	}
	return days;
};
