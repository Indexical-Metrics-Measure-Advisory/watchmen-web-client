import {FactorId} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionLabel} from '../widgets';
import {buildTimeMeasureOptions, buildTimePeriodOptions} from './utils';
import {TimePeriodContainer, TimePeriodDropdown} from './widgets';

export const TimePeriod = () => {
	const {visible, inspection, indicator} = useVisibleOnII();
	const forceUpdate = useForceUpdate();

	if (!visible) {
		return null;
	}

	const onTimeFactorChange = (option: DropdownOption) => {
		inspection!.timeFactorId = option.value as FactorId;
		forceUpdate();
	};
	const onTimeMeasureChange = (option: DropdownOption) => {
		inspection!.timeMeasure = option.value as MeasureMethod;
		forceUpdate();
	};

	const topic = indicator!.topic;
	const timeFactorOptions = buildTimePeriodOptions(topic);
	const factor = inspection?.timeFactorId == null
		? (void 0)
		// eslint-disable-next-line
		: (topic.factors || []).find(factor => factor.factorId == inspection.timeFactorId);
	const timeMeasureOptions = buildTimeMeasureOptions(factor);

	// 1. show year picker when factor supporting measure year and another one which under year
	// 2. show year picker only when factor only supporting measure year
	// 3. show measure picker only when factor doesn't supporting year measure
	return <TimePeriodContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.TIME_PERIOD_LABEL}</InspectionLabel>
		<TimePeriodDropdown value={inspection?.timeFactorId ?? null} options={timeFactorOptions}
		                    onChange={onTimeFactorChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<TimePeriodDropdown value={inspection?.timeMeasure ?? null} options={timeMeasureOptions}
		                    onChange={onTimeMeasureChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</TimePeriodContainer>;
};