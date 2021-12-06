import {FactorId} from '@/services/data/tuples/factor-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {buildTimePeriodOptions, tryToGetTopTimeMeasureByFactor} from '../../utils/measure';
import {getValidRanges} from '../../utils/range';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionLabel} from '../widgets';
import {TimePeriodFilterSelector} from './time-period-filter-selector';
import {TimePeriodContainer, TimePeriodDropdown} from './widgets';

export const TimePeriod = () => {
	const {fire} = useInspectionEventBus();
	const {visible, inspection, indicator} = useVisibleOnII();
	const forceUpdate = useForceUpdate();

	if (!visible) {
		return null;
	}

	const onTimeFactorChange = (option: DropdownOption) => {
		const factorId = option.value as FactorId;
		// eslint-disable-next-line
		if (inspection?.timeRangeFactorId == factorId) {
			return;
		}
		const previousTopTimeMeasure = tryToGetTopTimeMeasureByFactor(indicator?.topic, inspection?.timeRangeFactorId);
		const currentTopTimeMeasure = tryToGetTopTimeMeasureByFactor(indicator?.topic, factorId);
		inspection!.timeRangeFactorId = factorId;
		inspection!.timeRangeMeasure = currentTopTimeMeasure;
		if (currentTopTimeMeasure !== previousTopTimeMeasure) {
			// even factor is changed, time ranges still can be retained
			// otherwise, time ranges must be cleared
			delete inspection?.timeRanges;
		}
		delete inspection?.measureOnTimeFactorId;
		delete inspection?.measureOnTime;

		fire(InspectionEventTypes.TIME_RANGE_ON_CHANGED, inspection!);
		forceUpdate();
	};
	const onValueChanged = () => {
		const oneRangeOnly = new Set((getValidRanges(inspection ?? (void 0)) || []).map(range => range.value)).size === 1;
		if (oneRangeOnly
			// eslint-disable-next-line
			&& inspection?.timeRangeFactorId == inspection?.measureOnTimeFactorId
			&& inspection?.timeRangeMeasure === inspection?.measureOnTime) {
			// same measure with time range is not allowed
			delete inspection?.measureOnTimeFactorId;
			delete inspection?.measureOnTime;
		}

		fire(InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, inspection!);
		forceUpdate();
	};

	const topic = indicator!.topic;
	const timeFactorOptions = buildTimePeriodOptions(topic);

	return <TimePeriodContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.TIME_PERIOD_LABEL}</InspectionLabel>
		<TimePeriodDropdown value={inspection?.timeRangeFactorId ?? null} options={timeFactorOptions}
		                    onChange={onTimeFactorChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<TimePeriodFilterSelector inspection={inspection!} topic={topic} valueChanged={onValueChanged}/>
	</TimePeriodContainer>;
};