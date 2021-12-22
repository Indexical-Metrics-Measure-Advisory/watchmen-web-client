import {Navigation, NavigationTimeRangeType} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {CheckBox} from '@/widgets/basic/checkbox';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useCurve} from '../use-curve';
import {computeCurvePath} from '../utils';
import {TimeRangeCurve, TimeRangeNode, TimeRangeNodeContainer} from './widgets';

export const TimeRange = (props: { rootId: string; navigation: Navigation }) => {
	const {rootId, navigation} = props;

	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	const {ref, curve} = useCurve(rootId);

	const onTimeRangeTypeChanged = (option: DropdownOption) => {
		const {timeRangeType: oldType} = navigation;
		const newType = option.value as NavigationTimeRangeType;
		if (oldType === newType) {
			return;
		}

		navigation.timeRangeType = newType;
		if (navigation.timeRangeYear == null) {
			navigation.timeRangeYear = `${new Date().getFullYear() - 1}`;
		}
		if (newType === NavigationTimeRangeType.YEAR) {
			delete navigation.timeRangeMonth;
		} else {
			navigation.timeRangeMonth = '1';
		}
		forceUpdate();
		fireEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, navigation);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
	};
	const onTimeRangeYearChanged = (option: DropdownOption) => {
		navigation.timeRangeYear = option.value as string;
		forceUpdate();
		fireEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, navigation);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
	};
	const onTimeRangeMonthChanged = (option: DropdownOption) => {
		navigation.timeRangeMonth = option.value as string;
		forceUpdate();
		fireEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, navigation);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
	};
	const onCompareWithChanged = (value: boolean) => {
		navigation.compareWithPreviousTimeRange = value;
		forceUpdate();
		fireEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, navigation);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
	};

	const timeRangeTypeOptions = [
		{value: NavigationTimeRangeType.YEAR, label: Lang.INDICATOR_WORKBENCH.NAVIGATION.TIME_RANGE_YEAR},
		{value: NavigationTimeRangeType.MONTH, label: Lang.INDICATOR_WORKBENCH.NAVIGATION.TIME_RANGE_MONTH}
	];
	const timeRangeYearOptions = new Array(10).fill(1).map((_, index) => {
		const year = new Date().getFullYear() - index;
		return {value: `${year}`, label: `${year}`};
	});
	const timeRangeMonthOptions = [
		{value: '1', label: Lang.CALENDAR.JAN},
		{value: '2', label: Lang.CALENDAR.FEB},
		{value: '3', label: Lang.CALENDAR.MAR},
		{value: '4', label: Lang.CALENDAR.APR},
		{value: '5', label: Lang.CALENDAR.MAY},
		{value: '6', label: Lang.CALENDAR.JUN},
		{value: '7', label: Lang.CALENDAR.JUL},
		{value: '8', label: Lang.CALENDAR.AUG},
		{value: '9', label: Lang.CALENDAR.SEP},
		{value: '10', label: Lang.CALENDAR.OCT},
		{value: '11', label: Lang.CALENDAR.NOV},
		{value: '12', label: Lang.CALENDAR.DEC}
	];

	return <TimeRangeNodeContainer>
		<TimeRangeNode ref={ref}>
			<span>{Lang.INDICATOR_WORKBENCH.NAVIGATION.TIME_RANGE}</span>
			<Dropdown value={navigation.timeRangeType ?? NavigationTimeRangeType.YEAR}
			          options={timeRangeTypeOptions}
			          onChange={onTimeRangeTypeChanged}/>
			<Dropdown value={navigation.timeRangeYear} options={timeRangeYearOptions}
			          onChange={onTimeRangeYearChanged}/>
			{navigation.timeRangeType === NavigationTimeRangeType.MONTH
				? <Dropdown value={navigation.timeRangeMonth} options={timeRangeMonthOptions}
				            onChange={onTimeRangeMonthChanged}/>
				: null}
			<span>{Lang.INDICATOR_WORKBENCH.NAVIGATION.TIME_RANGE_COMPARE_WITH_PREVIOUS}</span>
			<CheckBox value={navigation.compareWithPreviousTimeRange} onChange={onCompareWithChanged}/>
		</TimeRangeNode>
		{curve == null
			? null
			: <TimeRangeCurve rect={curve}>
				<g>
					<path d={computeCurvePath(curve)}/>
				</g>
			</TimeRangeCurve>}
	</TimeRangeNodeContainer>;
};