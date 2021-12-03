import {Inspection, InspectionTimeRangeType, InspectionYearRange} from '@/services/data/tuples/inspection-types';
import {ICON_SELECTED} from '@/widgets/basic/constants';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getValidYearRanges} from './utils';
import {YearPickDropdown, YearPickDropdownOption} from './widgets';

export const YearPicker = (props: { inspection: Inspection; onYearsChange: () => void }) => {
	const {inspection, onYearsChange} = props;

	const forceUpdate = useForceUpdate();

	const ranges = getValidYearRanges(inspection);

	const onValueChange = (option: DropdownOption) => {
		const year = option.value as number;
		const ranges = getValidYearRanges(inspection);
		// eslint-disable-next-line
		if (ranges.some(range => range.year == year)) {
			// eslint-disable-next-line
			inspection.timeRange = ranges.filter(range => range.year != year);
		} else {
			if (inspection!.timeRange == null) {
				inspection!.timeRange = [];
			}
			inspection!.timeRange.push({type: InspectionTimeRangeType.YEAR, year} as InspectionYearRange);
		}
		onYearsChange();
		forceUpdate();
		return {active: true};
	};

	const currentYear = new Date().getFullYear();
	const options: Array<DropdownOption> = new Array(10).fill(1).map((_, index) => {
		return currentYear - index;
	}).map(year => {
		return {
			value: year,
			label: () => {
				// eslint-disable-next-line
				const selected = ranges.some(range => range.year == year);
				return {
					node: <YearPickDropdownOption>
						<span>{year}</span>
						{selected ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}
					</YearPickDropdownOption>,
					label: `${year}`
				};
			}
		};
	});
	const selection = () => {
		const displayRanges = ranges.map(range => range.year)
			.sort((y1, y2) => `${y1}`.localeCompare(`${y2}`, void 0, {numeric: true}))
			.join(', ');
		if (displayRanges.length === 0) {
			return Lang.INDICATOR_WORKBENCH.INSPECTION.ALL_TIME_PERIOD;
		} else {
			return <span>{displayRanges}</span>;
		}
	};

	return <YearPickDropdown value={''} options={options}
	                         display={selection}
	                         onChange={onValueChange}/>;
};