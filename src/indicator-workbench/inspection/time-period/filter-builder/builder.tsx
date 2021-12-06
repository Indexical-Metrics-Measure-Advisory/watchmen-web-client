import {Inspection, InspectionTimeRange, InspectionTimeRangeType} from '@/services/data/tuples/inspection-types';
import {ICON_SELECTED} from '@/widgets/basic/constants';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	getValidAmPmRanges,
	getValidDayKindRanges,
	getValidDayOfMonthRanges,
	getValidDayOfWeekRanges,
	getValidHalfMonthRanges,
	getValidHalfWeekRanges,
	getValidHalfYearRanges,
	getValidHourKindRanges,
	getValidHourRanges,
	getValidMonthRanges,
	getValidQuarterRanges,
	getValidTenDaysRanges,
	getValidWeekOfMonthRanges,
	getValidWeekOfYearRanges,
	getValidYearRanges
} from '../../../utils/range';
import {
	TimePeriodFilterDisplayLabel,
	TimePeriodFilterDisplayLabelSegment,
	TimePeriodFilterDropdownOption
} from '../widgets';
import {FilterValidTimeRanges, RangeCandidate, RangeCreator, RangeEquation, RangesToLabel} from './types';

const buildOnValueChange = (options: {
	inspection: Inspection;
	filterValid: FilterValidTimeRanges;
	equals: RangeEquation;
	create: RangeCreator
	onValueChanged: () => void;
}) => {
	const {inspection, filterValid, equals, create, onValueChanged} = options;

	return (option: DropdownOption) => {
		const value = option.value as number;
		if (value === -1) {
			delete inspection.timeRanges;
			onValueChanged();
		} else {
			const ranges = filterValid(inspection);
			// eslint-disable-next-line
			if (ranges.some(range => equals(range, value))) {
				// eslint-disable-next-line
				inspection.timeRanges = ranges.filter(range => !equals(range, value));
			} else {
				if (inspection!.timeRanges == null) {
					inspection!.timeRanges = [];
				}
				inspection!.timeRanges.push(create(value));
			}
			onValueChanged();
			return {active: true};
		}
	};
};

const buildDropdownOptions = (options: {
	inspection: Inspection;
	filterValid: FilterValidTimeRanges;
	equals: RangeEquation;
	candidates: Array<RangeCandidate>;
}) => {
	const {inspection, filterValid, candidates, equals} = options;

	const ranges = filterValid(inspection);
	return [
		{value: -1, label: Lang.INDICATOR_WORKBENCH.INSPECTION.ALL_TIME_PERIOD},
		...candidates.map(candidate => {
			return {
				value: candidate.value,
				label: () => {
					// eslint-disable-next-line
					const selected = ranges.some(range => equals(range, candidate.value));
					return {
						node: <TimePeriodFilterDropdownOption>
							<span>{candidate.node ?? candidate.label}</span>
							{selected ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}
						</TimePeriodFilterDropdownOption>,
						label: candidate.label
					};
				}
			};
		})
	];
};

const buildSelection = (options: { inspection: Inspection; toLabel: RangesToLabel }) => {
	const {inspection, toLabel} = options;

	return () => {
		const displayRanges = toLabel(inspection);
		if (displayRanges.length === 0) {
			return Lang.INDICATOR_WORKBENCH.INSPECTION.ALL_TIME_PERIOD;
		} else {
			return <TimePeriodFilterDisplayLabel>{displayRanges}</TimePeriodFilterDisplayLabel>;
		}
	};
};

const buildFilter = (options: {
	inspection: Inspection;
	filterValid: FilterValidTimeRanges;
	equals: RangeEquation;
	create: RangeCreator;
	candidates: Array<RangeCandidate>;
	toLabel: RangesToLabel;
	onValueChanged: () => void;
}) => {
	const {inspection, filterValid, equals, create, candidates, toLabel, onValueChanged} = options;

	const onValueChange = buildOnValueChange({inspection, filterValid, equals, create, onValueChanged});
	const dropdownOptions = buildDropdownOptions({inspection, filterValid, equals, candidates});
	const selection = buildSelection({inspection, toLabel});

	return {options: dropdownOptions, selection, onValueChange};
};

const build = (options: {
	inspection: Inspection;
	getValidRanges: (inspection: Inspection) => Array<InspectionTimeRange>;
	rangeType: InspectionTimeRangeType;
	candidates: Array<RangeCandidate>;
	onValueChanged: () => void;
}) => {
	const {inspection, getValidRanges, rangeType, candidates, onValueChanged} = options;

	return buildFilter({
		inspection,
		filterValid: inspection => getValidRanges(inspection),
		// eslint-disable-next-line
		equals: (range, value) => range.value == value,
		create: (value) => ({type: rangeType, value}),
		candidates,
		toLabel: (inspection: Inspection) => {
			return getValidRanges(inspection)
				.sort(({value: v1}, {value: v2}) => `${v1}`.localeCompare(`${v2}`, void 0, {numeric: true}))
				.map(range => {
					// eslint-disable-next-line
					const candidate = candidates.find(candidate => candidate.value == range.value);
					return <TimePeriodFilterDisplayLabelSegment key={range.value}>
						{candidate?.node ?? candidate?.label ?? range.value}
					</TimePeriodFilterDisplayLabelSegment>;
				});
		},
		onValueChanged
	});
};

export const buildYearsFilter = (inspection: Inspection, onValueChanged: () => void) => {
	const currentYear = new Date().getFullYear();

	return build({
		inspection,
		getValidRanges: getValidYearRanges,
		rangeType: InspectionTimeRangeType.YEAR,
		candidates: new Array(10).fill(1).map((_, index) => {
			return {value: currentYear - index, label: `${currentYear - index}`};
		}),
		onValueChanged
	});
};

export const buildHalfYearsFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidHalfYearRanges,
		rangeType: InspectionTimeRangeType.HALF_YEAR,
		candidates: [
			{value: 1, label: Lang.CALENDAR.HALF_YEAR_1ST},
			{value: 2, label: Lang.CALENDAR.HALF_YEAR_2ND}
		],
		onValueChanged
	});
};

export const buildQuartersFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidQuarterRanges,
		rangeType: InspectionTimeRangeType.QUARTER,
		candidates: [
			{value: 1, label: Lang.CALENDAR.QUARTER_1ST},
			{value: 2, label: Lang.CALENDAR.QUARTER_2ND},
			{value: 3, label: Lang.CALENDAR.QUARTER_3RD},
			{value: 4, label: Lang.CALENDAR.QUARTER_4TH}
		],
		onValueChanged
	});
};

export const buildMonthsFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidMonthRanges,
		rangeType: InspectionTimeRangeType.MONTH,
		candidates: [
			{value: 1, label: Lang.CALENDAR.JAN},
			{value: 2, label: Lang.CALENDAR.FEB},
			{value: 3, label: Lang.CALENDAR.MAR},
			{value: 4, label: Lang.CALENDAR.APR},
			{value: 5, label: Lang.CALENDAR.MAY},
			{value: 6, label: Lang.CALENDAR.JUN},
			{value: 7, label: Lang.CALENDAR.JUL},
			{value: 8, label: Lang.CALENDAR.AUG},
			{value: 9, label: Lang.CALENDAR.SEP},
			{value: 10, label: Lang.CALENDAR.OCT},
			{value: 11, label: Lang.CALENDAR.NOV},
			{value: 12, label: Lang.CALENDAR.DEC}
		],
		onValueChanged
	});
};

export const buildHalfMonthsFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidHalfMonthRanges,
		rangeType: InspectionTimeRangeType.HALF_MONTH,
		candidates: [
			{value: 1, label: Lang.CALENDAR.HALF_MONTH_1ST},
			{value: 2, label: Lang.CALENDAR.HALF_MONTH_2ND}
		],
		onValueChanged
	});
};

export const buildTenDaysFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidTenDaysRanges,
		rangeType: InspectionTimeRangeType.TEN_DAYS,
		candidates: [
			{value: 1, label: Lang.CALENDAR.TEN_DAYS_1ST},
			{value: 2, label: Lang.CALENDAR.TEN_DAYS_2ND},
			{value: 3, label: Lang.CALENDAR.TEN_DAYS_3RD}
		],
		onValueChanged
	});
};

export const buildWeeksOfYearFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidWeekOfYearRanges,
		rangeType: InspectionTimeRangeType.WEEK_OF_YEAR,
		candidates: new Array(54).fill(1).map((_, index) => {
			return {value: index, label: `${index}`, node: <>{Lang.CALENDAR.WEEK} #{index}</>};
		}),
		onValueChanged
	});
};

export const buildWeeksOfMonthFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidWeekOfMonthRanges,
		rangeType: InspectionTimeRangeType.WEEK_OF_MONTH,
		candidates: [
			{value: 0, label: Lang.CALENDAR.WEEK_0},
			{value: 1, label: Lang.CALENDAR.WEEK_1},
			{value: 2, label: Lang.CALENDAR.WEEK_2},
			{value: 3, label: Lang.CALENDAR.WEEK_3},
			{value: 4, label: Lang.CALENDAR.WEEK_4},
			{value: 5, label: Lang.CALENDAR.WEEK_5}
		],
		onValueChanged
	});
};

export const buildHalfWeeksFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidHalfWeekRanges,
		rangeType: InspectionTimeRangeType.HALF_WEEK,
		candidates: [
			{value: 1, label: Lang.CALENDAR.HALF_WEEK_1ST},
			{value: 2, label: Lang.CALENDAR.HALF_WEEK_2ND}
		],
		onValueChanged
	});
};

export const buildDaysOfMonthFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidDayOfMonthRanges,
		rangeType: InspectionTimeRangeType.DAY_OF_MONTH,
		candidates: new Array(31).fill(1).map((_, index) => {
			return {value: index + 1, label: `#${index + 1}`};
		}),
		onValueChanged
	});
};

export const buildDaysOfWeekFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidDayOfWeekRanges,
		rangeType: InspectionTimeRangeType.DAY_OF_WEEK,
		candidates: [
			{value: 1, label: Lang.CALENDAR.SUNDAY},
			{value: 2, label: Lang.CALENDAR.MONDAY},
			{value: 3, label: Lang.CALENDAR.TUESDAY},
			{value: 4, label: Lang.CALENDAR.WEDNESDAY},
			{value: 5, label: Lang.CALENDAR.THURSDAY},
			{value: 6, label: Lang.CALENDAR.FRIDAY},
			{value: 7, label: Lang.CALENDAR.SATURDAY}
		],
		onValueChanged
	});
};

export const buildDayKindsFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidDayKindRanges,
		rangeType: InspectionTimeRangeType.DAY_KIND,
		candidates: [
			{value: 1, label: Lang.CALENDAR.WORKDAY},
			{value: 2, label: Lang.CALENDAR.WEEKEND},
			{value: 3, label: Lang.CALENDAR.HOLIDAY}
		],
		onValueChanged
	});
};

export const buildHoursFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidHourRanges,
		rangeType: InspectionTimeRangeType.HOUR,
		candidates: new Array(24).fill(1).map((_, index) => {
			return {value: index, label: `[${index}:00, ${index + 1}:00)`};
		}),
		onValueChanged
	});
};

export const buildHourKindsFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidHourKindRanges,
		rangeType: InspectionTimeRangeType.HOUR_KIND,
		candidates: [
			{value: 1, label: Lang.CALENDAR.WORK_TIME},
			{value: 2, label: Lang.CALENDAR.OFF_HOURS},
			{value: 3, label: Lang.CALENDAR.SLEEPING_TIME}
		],
		onValueChanged
	});
};

export const buildAmPmFilter = (inspection: Inspection, onValueChanged: () => void) => {
	return build({
		inspection,
		getValidRanges: getValidAmPmRanges,
		rangeType: InspectionTimeRangeType.AM_PM,
		candidates: [
			{value: 1, label: Lang.CALENDAR.AM},
			{value: 2, label: Lang.CALENDAR.PM}
		],
		onValueChanged
	});
};
