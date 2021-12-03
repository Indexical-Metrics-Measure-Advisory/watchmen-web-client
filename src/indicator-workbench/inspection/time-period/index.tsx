import {FactorId} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionLabel} from '../widgets';
import {TimePeriodFilterSelector} from './time-period-filter-selector';
import {buildTimeMeasureOptions, buildTimePeriodOptions} from './utils';
import {TimePeriodContainer, TimePeriodDropdown} from './widgets';

export const TimePeriod = () => {
	const {visible, inspection, indicator} = useVisibleOnII();
	const forceUpdate = useForceUpdate();

	if (!visible) {
		return null;
	}

	const onTimeFactorChange = (option: DropdownOption) => {
		const factorId = option.value as FactorId;
		// eslint-disable-next-line
		if (inspection?.timeFactorId == factorId) {
			return;
		}
		inspection!.timeFactorId = factorId;
		// eslint-disable-next-line
		const factor = (indicator?.topic.factors || []).find(factor => factor.factorId == inspection?.timeFactorId);
		if (factor != null) {
			const measures = tryToTransformToMeasures(factor);
			// TODO only year filter is supported now
			if (inspection?.timeRange != null && !measures.includes(MeasureMethod.YEAR)) {
				delete inspection.timeRange;
			}
			if (inspection?.timeMeasure != null && !measures.includes(inspection.timeMeasure)) {
				delete inspection.timeMeasure;
			}
		}
		forceUpdate();
	};
	const onValueChanged = () => {
		forceUpdate();
	};
	const onTimeMeasureChange = (option: DropdownOption) => {
		const measure = option.value as MeasureMethod;
		if (inspection?.timeMeasure === measure) {
			return;
		}
		inspection!.timeMeasure = measure;
		forceUpdate();
	};

	const topic = indicator!.topic;
	const timeFactorOptions = buildTimePeriodOptions(topic);
	const factor = inspection?.timeFactorId == null
		? (void 0)
		// eslint-disable-next-line
		: (topic.factors || []).find(factor => factor.factorId == inspection.timeFactorId);
	const {options: timeMeasureOptions} = buildTimeMeasureOptions(inspection!, factor);

	// 1. show year picker when factor supporting measure year and another one which under year
	// 2. show year picker only when factor only supporting measure year
	// 3. show measure picker only when factor doesn't supporting year measure
	return <TimePeriodContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.TIME_PERIOD_LABEL}</InspectionLabel>
		<TimePeriodDropdown value={inspection?.timeFactorId ?? null} options={timeFactorOptions}
		                    onChange={onTimeFactorChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<TimePeriodFilterSelector inspection={inspection!} topic={topic} valueChanged={onValueChanged}/>
		{timeMeasureOptions.length > 1
			? <TimePeriodDropdown value={inspection?.timeMeasure ?? ''} options={timeMeasureOptions}
			                      onChange={onTimeMeasureChange}
			                      please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
			: null}
	</TimePeriodContainer>;
};