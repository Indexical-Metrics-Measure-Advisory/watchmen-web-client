import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
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
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {useFunnelRange} from '../use-funnel-range';
import {PairToLabel} from '../widgets';
import {getAsString, onDropdownValueChange} from './value-utils';

const Editor = (props: {
	report: Report;
	funnel: ReportFunnel;
	valueIndex: number;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, valueIndex, options} = props;

	const {fire} = useReportEditEventBus();

	const value = getAsString(funnel, valueIndex);
	const onValueChange = onDropdownValueChange(funnel, valueIndex, () => fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel));

	return <DropdownValue value={value ? value.toString() : ''}
	                      onValueChange={onValueChange}
	                      options={[{value: '', label: Lang.CHART.PLEASE_SELECT_FUNNEL_VALUE}, ...options]}/>;
};

const SingleEditor = (props: {
	report: Report;
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, acceptedType, options} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== acceptedType || funnel.range) {
		return null;
	}

	return <Editor report={report} funnel={funnel} valueIndex={0} options={options}/>;
};

const PairEditor = (props: {
	report: Report;
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, acceptedType, options} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== acceptedType || !funnel.range) {
		return null;
	}

	return <>
		<Editor report={report} funnel={funnel} valueIndex={0} options={options}/>
		<PairToLabel>~</PairToLabel>
		<Editor report={report} funnel={funnel} valueIndex={1} options={options}/>
	</>;
};

const FixedDropdownEditor = (props: {
	report: Report;
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, acceptedType, options} = props;

	return <>
		<SingleEditor report={report} funnel={funnel} acceptedType={acceptedType} options={options}/>
		<PairEditor report={report} funnel={funnel} acceptedType={acceptedType} options={options}/>
	</>;
};

export const HalfYearEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfYear => ({value: `${halfYear}`, label: ReportFunnelHalfYear[halfYear - 1]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.HALF_YEAR}
	                            options={options}/>;
};

export const QuarterEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3, 4].map(quarter => ({value: `${quarter}`, label: ReportFunnelQuarter[quarter - 1]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
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

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.MONTH}
	                            options={options}/>;
};

export const HalfMonthEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfMonth => ({value: `${halfMonth}`, label: ReportFunnelHalfMonth[halfMonth - 1]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.HALF_MONTH}
	                            options={options}/>;
};

export const TenDaysEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(tenDays => ({value: `${tenDays}`, label: ReportFunnelTenDays[tenDays - 1]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.HALF_MONTH}
	                            options={options}/>;
};

export const WeekOfMonthEditor = (props: { report: Report; funnel: ReportFunnel; }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [0, 1, 2, 3, 4, 5].map(week => ({value: `${week}`, label: ReportFunnelWeekOfMonth[week]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.WEEK_OF_MONTH}
	                            options={options}/>;
};

export const HalfWeekEditor = (props: { report: Report; funnel: ReportFunnel; }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2].map(halfWeek => ({value: `${halfWeek}`, label: ReportFunnelHalfWeek[halfWeek]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.HALF_WEEK}
	                            options={options}/>;
};

export const DayKindEditor = (props: { report: Report; funnel: ReportFunnel; }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(dayKind => ({value: `${dayKind}`, label: ReportFunnelDayKind[dayKind]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
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

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.DAY_OF_WEEK}
	                            options={options}/>;
};

export const HourEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return new Array(23).fill(1)
			.map(hour => ({value: `${hour}`, label: `${hour}`}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.HOUR}
	                            options={options}/>;
};

export const HourKindEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(hourKind => ({value: `${hourKind}`, label: ReportFunnelHourKind[hourKind]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.HOUR_KIND}
	                            options={options}/>;
};

export const AmPmEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const [options] = useState<Array<DropdownOption>>(() => {
		return [1, 2, 3].map(ampm => ({value: `${ampm}`, label: ReportFunnelAmPm[ampm]}));
	});

	return <FixedDropdownEditor report={report} funnel={funnel}
	                            acceptedType={ReportFunnelType.AM_PM}
	                            options={options}/>;
};
