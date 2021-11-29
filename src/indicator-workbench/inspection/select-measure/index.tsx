import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {detectMeasures, isTimePeriodMeasure} from '@/services/data/tuples/indicator-utils';
import {Inspection, InspectOn} from '@/services/data/tuples/inspection-types';
import {
	QueryBucket,
	QueryByBucketMethod,
	QueryByEnumMethod,
	QueryByMeasureMethod
} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {PropOf} from '@/services/types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel} from '../widgets';
import {InspectOnDropdown, SelectMeasureContainer} from './widgets';

const InspectOnLabel: Record<InspectOn, string> = {
	[InspectOn.VALUE_COUNT]: Lang.INDICATOR_WORKBENCH.INSPECTION.PERSPECTIVE_ON_VALUE_COUNT,
	[InspectOn.VALUE_SUM]: Lang.INDICATOR_WORKBENCH.INSPECTION.PERSPECTIVE_ON_VALUE_SUM,
	[InspectOn.VALUE_AVG]: Lang.INDICATOR_WORKBENCH.INSPECTION.PERSPECTIVE_ON_VALUE_AVG,
	[InspectOn.VALUE_MAX]: Lang.INDICATOR_WORKBENCH.INSPECTION.PERSPECTIVE_ON_VALUE_MAX,
	[InspectOn.VALUE_MIN]: Lang.INDICATOR_WORKBENCH.INSPECTION.PERSPECTIVE_ON_VALUE_MIN
};

export const SelectMeasure = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const [, setBuckets] = useState<Array<QueryBucket>>([]);
	const forceUpdate = useForceUpdate();
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

	const onOnChange = (option: DropdownOption) => {
		inspection!.on = option.value as PropOf<Inspection, 'on'>;
		forceUpdate();
	};

	const onOptions = [
		...(indicator?.indicator.factorId == null) ? [] : Object.values(InspectOn).map(on => {
			return {value: on, label: InspectOnLabel[on as InspectOn]};
		}),
		...Object.values(
			detectMeasures(indicator?.topic, (measure: MeasureMethod) => !isTimePeriodMeasure(measure))
				.reduce((all, {factorId}) => {
					if (all[factorId] == null) {
						// eslint-disable-next-line
						const factor = indicator?.topic.factors.find(factor => factor.factorId == factorId);
						if (factor != null) {
							all[factorId] = factor;
						}
					}
					return all;
				}, {} as Record<FactorId, Factor>)
		).sort((f1, f2) => {
			return (f1.label || f1.name || '').localeCompare(f2.label || f2.name || '', void 0, {
				sensitivity: 'base',
				caseFirst: 'upper'
			});
		}).map(factor => {
			return {value: factor.factorId, label: factor.label || factor.name || ''};
		})
	];

	return <SelectMeasureContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_PERSPECTIVES}</InspectionLabel>
		<InspectOnDropdown value={inspection?.on ?? null} options={onOptions} onChange={onOnChange}
		                   please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</SelectMeasureContainer>;
};