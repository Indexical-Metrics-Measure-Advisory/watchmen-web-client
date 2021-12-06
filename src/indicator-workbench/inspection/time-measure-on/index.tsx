import {FactorId} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {MeasureMethodLabels} from '@/widgets/basic/measure-method-label';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionLabel} from '../widgets';
import {buildTimeMeasureOptions} from './utils';
import {TimeMeasureOnContainer, TimeMeasureOnDropdown} from './widgets';

export const TimeMeasureOn = () => {
	const {on, off} = useInspectionEventBus();
	const {visible, inspection, indicator} = useVisibleOnII();
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		const onTimeFactorChanged = (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}
			forceUpdate();
		};
		on(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onTimeFactorChanged);
		on(InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, onTimeFactorChanged);
		return () => {
			off(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onTimeFactorChanged);
			off(InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, onTimeFactorChanged);
		};
	}, [on, off, forceUpdate, inspection]);

	if (!visible) {
		return null;
	}

	const onTimeMeasureChange = (option: DropdownOption) => {
		const {factorId, measure} = option.value as { factorId: FactorId, measure: MeasureMethod };
		// eslint-disable-next-line
		if (inspection?.measureOnTime === measure && inspection.measureOnTimeFactorId == factorId) {
			return;
		}
		inspection!.measureOnTime = measure;
		inspection!.measureOnTimeFactorId = factorId;
		forceUpdate();
	};

	const topic = indicator!.topic;
	const factor = inspection?.timeRangeFactorId == null
		? (void 0)
		// eslint-disable-next-line
		: (topic.factors || []).find(factor => factor.factorId == inspection.timeRangeFactorId);
	const timeMeasureOptions = buildTimeMeasureOptions(inspection!, topic, factor);
	const timeMeasureSelection = () => {
		if (inspection?.measureOnTime == null) {
			return Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE;
		} else {
			// eslint-disable-next-line
			const factor = (topic.factors || []).find(factor => factor.factorId == inspection.measureOnTimeFactorId);
			return <>
				{MeasureMethodLabels[inspection.measureOnTime]} - {factor?.label || factor?.name || 'Noname Factor'}
			</>;
		}
	};

	return <TimeMeasureOnContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.TIME_MEASURE_ON_LABEL}</InspectionLabel>
		<TimeMeasureOnDropdown value={inspection?.measureOnTime ?? ''} options={timeMeasureOptions}
		                       onChange={onTimeMeasureChange}
		                       display={timeMeasureSelection}
		                       please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</TimeMeasureOnContainer>;
};