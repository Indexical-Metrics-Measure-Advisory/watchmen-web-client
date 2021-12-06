import {FactorId} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {MeasureMethodLabels} from '@/widgets/basic/measure-method-label';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionLabel} from '../widgets';
import {TimePeriodFilterSelector} from './time-period-filter-selector';
import {buildTimeMeasureOptions, buildTimePeriodOptions, tryToGetTopTimeMeasureByFactor} from './utils';
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
		if (inspection?.firstTimeFactorId == factorId) {
			return;
		}
		const previousTopTimeMeasure = tryToGetTopTimeMeasureByFactor(indicator?.topic, inspection?.firstTimeFactorId);
		const currentTopTimeMeasure = tryToGetTopTimeMeasureByFactor(indicator?.topic, factorId);
		inspection!.firstTimeFactorId = factorId;
		inspection!.firstTimeMeasure = currentTopTimeMeasure;
		if (currentTopTimeMeasure !== previousTopTimeMeasure) {
			// even factor is changed, time ranges still can be retained
			// otherwise, time ranges must be cleared
			delete inspection?.firstTimeRanges;
		}
		delete inspection?.secondaryTimeMeasureFactorId;
		delete inspection?.secondaryTimeMeasure;

		forceUpdate();
	};
	const onValueChanged = () => {
		forceUpdate();
	};
	const onTimeMeasureChange = (option: DropdownOption) => {
		const {factorId, measure} = option.value as { factorId: FactorId, measure: MeasureMethod };
		// eslint-disable-next-line
		if (inspection?.secondaryTimeMeasure === measure && inspection.secondaryTimeMeasureFactorId == factorId) {
			return;
		}
		inspection!.secondaryTimeMeasure = measure;
		inspection!.secondaryTimeMeasureFactorId = factorId;
		forceUpdate();
	};

	const topic = indicator!.topic;
	const timeFactorOptions = buildTimePeriodOptions(topic);
	const factor = inspection?.firstTimeFactorId == null
		? (void 0)
		// eslint-disable-next-line
		: (topic.factors || []).find(factor => factor.factorId == inspection.firstTimeFactorId);
	const timeMeasureOptions = buildTimeMeasureOptions(inspection!, topic, factor);
	const timeMeasureSelection = () => {
		if (inspection?.secondaryTimeMeasure == null) {
			return Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE;
		} else {
			// eslint-disable-next-line
			const factor = (topic.factors || []).find(factor => factor.factorId == inspection.secondaryTimeMeasureFactorId);
			return <>
				{MeasureMethodLabels[inspection.secondaryTimeMeasure]} - {factor?.label || factor?.name || 'Noname Factor'}
			</>;
		}
	};

	return <TimePeriodContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.TIME_PERIOD_LABEL}</InspectionLabel>
		<TimePeriodDropdown value={inspection?.firstTimeFactorId ?? null} options={timeFactorOptions}
		                    onChange={onTimeFactorChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<TimePeriodFilterSelector inspection={inspection!} topic={topic} valueChanged={onValueChanged}/>
		{timeMeasureOptions.length > 1
			? <TimePeriodDropdown value={inspection?.secondaryTimeMeasure ?? ''} options={timeMeasureOptions}
			                      onChange={onTimeMeasureChange}
			                      display={timeMeasureSelection}
			                      please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
			: null}
	</TimePeriodContainer>;
};