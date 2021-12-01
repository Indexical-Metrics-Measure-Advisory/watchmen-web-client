import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel} from '../widgets';
import {buildBucketsAskingParams, buildMeasureOnOptions} from './utils';
import {InspectOnDropdown, SelectMeasureContainer} from './widgets';

export const Perspective = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const [buckets, setBuckets] = useState<Array<QueryBucket>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const askBuckets = async ({indicator, topic}: IndicatorForInspection): Promise<Array<QueryBucket>> => {
			return new Promise(resolve => {
				fire(InspectionEventTypes.ASK_BUCKETS, buildBucketsAskingParams(indicator, topic), (buckets: Array<QueryBucket>) => {
					resolve(buckets);
				});
			});
		};
		const onIndicatorPicked = async (indicator: IndicatorForInspection) => {
			const buckets = await askBuckets(indicator!);
			setIndicator(indicator);
			setBuckets(buckets);
			setVisible(true);
		};
		const onInspectionPicked = async (inspection: Inspection, indicator?: IndicatorForInspection) => {
			setInspection(inspection);
			if (inspection.indicatorId != null) {
				await onIndicatorPicked(indicator!);
			}
		};
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	}, [on, off, fire]);

	if (!visible) {
		return null;
	}

	const onMeasureOnChange = (option: DropdownOption) => {
		if (option.value === InspectMeasureOn.VALUE) {
			inspection!.measureOn = InspectMeasureOn.VALUE;
			delete inspection?.measureFactorId;
		} else {
			inspection!.measureFactorId = option.value;
			inspection!.measureOn = InspectMeasureOn.OTHER;
		}
		forceUpdate();
	};
	// const onOptions = Object.values(
	// 	detectMeasures(indicator?.topic, (measure: MeasureMethod) => !isTimePeriodMeasure(measure))
	// 		.reduce((all, {factorId}) => {
	// 			if (all[factorId] == null) {
	// 				// eslint-disable-next-line
	// 				const factor = indicator?.topic.factors.find(factor => factor.factorId == factorId);
	// 				if (factor != null) {
	// 					all[factorId] = factor;
	// 				}
	// 			}
	// 			return all;
	// 		}, {} as Record<FactorId, Factor>)
	// ).sort((f1, f2) => {
	// 	return (f1.label || f1.name || '').localeCompare(f2.label || f2.name || '', void 0, {
	// 		sensitivity: 'base',
	// 		caseFirst: 'upper'
	// 	});
	// }).map(factor => {
	// 	return {value: factor.factorId, label: factor.label || factor.name || ''};
	// });

	const measureOnOptions = buildMeasureOnOptions(indicator!.indicator, indicator!.topic, buckets);
	const measureOn = inspection?.measureOn === InspectMeasureOn.VALUE ? InspectMeasureOn.VALUE : inspection?.measureFactorId;

	return <SelectMeasureContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_PERSPECTIVES}</InspectionLabel>
		<InspectOnDropdown value={measureOn} options={measureOnOptions} onChange={onMeasureOnChange}
		                   please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</SelectMeasureContainer>;
};