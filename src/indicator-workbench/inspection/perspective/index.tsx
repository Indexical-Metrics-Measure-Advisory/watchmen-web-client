import {BucketType} from '@/services/data/tuples/bucket-types';
import {
	isCategoryMeasureBucket,
	isEnumMeasureBucket,
	isNumericValueMeasureBucket
} from '@/services/data/tuples/bucket-utils';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {detectMeasures, isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {
	QueryBucket,
	QueryByBucketMethod,
	QueryByEnumMethod,
	QueryByMeasureMethod
} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel} from '../widgets';
import {InspectOnDropdown, SelectMeasureContainer} from './widgets';

const MEASURE_ON_VALUE = 'value';

export const Perspective = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const [buckets, setBuckets] = useState<Array<QueryBucket>>([]);
	useEffect(() => {
		const askBuckets = async ({indicator, topic}: IndicatorForInspection): Promise<Array<QueryBucket>> => {
			return new Promise(resolve => {
				fire(InspectionEventTypes.ASK_BUCKETS, {
					valueBucketIds: indicator.valueBuckets ?? [],
					measureMethods: detectMeasures(topic, (measure: MeasureMethod) => !isTimePeriodMeasure(measure))
						.map(({factorId, method}) => {
							if (method === MeasureMethod.ENUM) {
								return {
									method: MeasureMethod.ENUM,
									// eslint-disable-next-line
									enumId: topic.factors.find(factor => factor.factorId == factorId)?.enumId
								} as QueryByEnumMethod;
							} else {
								return {method} as QueryByMeasureMethod;
							}
						}).reduce((all, method) => {
							if (isQueryByEnum(method)) {
								// eslint-disable-next-line
								if (all.every(existing => !isQueryByEnum(existing) || existing.enumId != method.enumId)) {
									all.push(method);
								}
							} else if (isQueryByMeasure(method)) {
								if (all.every(existing => existing.method !== method.method)) {
									all.push(method);
								}
							}
							return all;
						}, [] as Array<QueryByBucketMethod>)
				}, (buckets: Array<QueryBucket>) => {
					resolve(buckets);
				});
			});
		};
		const onInspectionPicked = async (inspection: Inspection, indicator?: IndicatorForInspection) => {
			setInspection(inspection);
			if (inspection.indicatorId != null) {
				const buckets = await askBuckets(indicator!);
				setIndicator(indicator!);
				setBuckets(buckets);
				setVisible(true);
			}
		};
		const onIndicatorPicked = async (indicator: IndicatorForInspection) => {
			const buckets = await askBuckets(indicator!);
			setIndicator(indicator);
			setBuckets(buckets);
			setVisible(true);
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	}, [on, off, fire]);

	if (!visible) {
		return null;
	}

	const onMeasureOnChange = (option: DropdownOption) => {
		if (option.value === MEASURE_ON_VALUE) {
			delete inspection?.measureFactorId;
		} else {
			inspection!.measureFactorId = option.value;
		}
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

	const canMeasureOnIndicatorValue = indicator?.indicator.factorId != null
		&& indicator.indicator.valueBuckets != null
		&& indicator.indicator.valueBuckets.length !== 0
		&& buckets.some(bucket => bucket.type === BucketType.VALUE);
	const measureOnOptions = [
		...canMeasureOnIndicatorValue ? [{
			value: MEASURE_ON_VALUE,
			label: () => {
				return {
					node: Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_ON_VALUE,
					label: 'on value'
				};
			},
			key: MEASURE_ON_VALUE
		}] : [],
		...(indicator?.topic.factors || []).filter(factor => {
			if (factor.enumId != null) {
				// eslint-disable-next-line
				return buckets.some(bucket => isEnumMeasureBucket(bucket) && bucket.enumId == factor.enumId);
			} else {
				const measures = tryToTransformToMeasures(factor);
				if (measures.length === 0) {
					return false;
				}

				return measures.some(measure => {
					return buckets.some(bucket => {
						if (isNumericValueMeasureBucket(bucket)) {
							return bucket.measure === measure;
						} else if (isCategoryMeasureBucket(bucket)) {
							return bucket.measure === measure;
						}
						return false;
					});
				});
			}
		}).map(factor => {
			return {value: factor.factorId, label: factor.label || factor.name || 'Noname Factor'};
		})
	];
	const measureOn = canMeasureOnIndicatorValue
		? (inspection?.measureFactorId == null ? MEASURE_ON_VALUE : inspection.measureFactorId)
		: inspection?.measureFactorId;

	return <SelectMeasureContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_PERSPECTIVES}</InspectionLabel>
		<InspectOnDropdown value={measureOn} options={measureOnOptions} onChange={onMeasureOnChange}
		                   please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</SelectMeasureContainer>;
};