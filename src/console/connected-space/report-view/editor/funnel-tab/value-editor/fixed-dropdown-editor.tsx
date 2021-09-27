import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {DropdownOption} from '@/widgets/basic/types';
import React, {useState} from 'react';
import {
	ReportFunnelAmPm,
	ReportFunnelDayKind,
	ReportFunnelHalfMonth,
	ReportFunnelHalfWeek,
	ReportFunnelHalfYear,
	ReportFunnelHourKind,
	ReportFunnelMonth,
	ReportFunnelQuarter,
	ReportFunnelTenDays,
	ReportFunnelWeekOfMonth
} from '../../../../widgets/funnel/widgets';
import {DropdownEditor} from './dropdown-editor';

export const HalfYearEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfYear => ({value: `${halfYear}`, label: ReportFunnelHalfYear[halfYear - 1]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.HALF_YEAR}
	                       options={options}/>;
};

export const QuarterEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3, 4].map(quarter => ({value: `${quarter}`, label: ReportFunnelQuarter[quarter - 1]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.QUARTER}
	                       options={options}/>;
};

export const MonthEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => ({
			value: `${month}`,
			label: ReportFunnelMonth[month - 1]
		}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.MONTH}
	                       options={options}/>;
};

export const HalfMonthEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfMonth => ({value: `${halfMonth}`, label: ReportFunnelHalfMonth[halfMonth - 1]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.HALF_MONTH}
	                       options={options}/>;
};

export const TenDaysEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(tenDays => ({value: `${tenDays}`, label: ReportFunnelTenDays[tenDays - 1]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.HALF_MONTH}
	                       options={options}/>;
};

export const WeekOfMonthEditor = (props: { report: Report; funnel: ReportFunnel; }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [0, 1, 2, 3, 4, 5].map(week => ({value: `${week}`, label: ReportFunnelWeekOfMonth[week]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.WEEK_OF_MONTH}
	                       options={options}/>;
};

export const HalfWeekEditor = (props: { report: Report; funnel: ReportFunnel; }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfWeek => ({value: `${halfWeek}`, label: ReportFunnelHalfWeek[halfWeek]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.HALF_WEEK}
	                       options={options}/>;
};

export const DayKindEditor = (props: { report: Report; funnel: ReportFunnel; }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(dayKind => ({value: `${dayKind}`, label: ReportFunnelDayKind[dayKind]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.DAY_KIND}
	                       options={options}/>;
};

export const DayOfWeekEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return new Array(31).fill(1)
			.map((_, index) => index + 1)
			.map(day => ({value: `${day}`, label: `${day}`}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.DAY_OF_WEEK}
	                       options={options}/>;
};

export const HourEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return new Array(23).fill(1)
			.map(hour => ({value: `${hour}`, label: `${hour}`}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.HOUR}
	                       options={options}/>;
};

export const HourKindEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(hourKind => ({value: `${hourKind}`, label: ReportFunnelHourKind[hourKind]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.HOUR_KIND}
	                       options={options}/>;
};

export const AmPmEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(ampm => ({value: `${ampm}`, label: ReportFunnelAmPm[ampm]}));
	});

	return <DropdownEditor report={report} funnel={funnel}
	                       acceptedType={ReportFunnelType.AM_PM}
	                       options={options}/>;
};
