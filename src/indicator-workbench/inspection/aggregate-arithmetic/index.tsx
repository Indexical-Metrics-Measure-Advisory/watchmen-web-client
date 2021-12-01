import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {PropOf} from '@/services/types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel} from '../widgets';
import {ValueTransformContainer, ValueTransformDropdown} from './widgets';

const AggregateArithmeticLabel: Record<IndicatorAggregateArithmetic, string> = {
	[IndicatorAggregateArithmetic.COUNT]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_COUNT,
	[IndicatorAggregateArithmetic.SUM]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_SUM,
	[IndicatorAggregateArithmetic.AVG]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_AVG,
	[IndicatorAggregateArithmetic.MAX]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_MAX,
	[IndicatorAggregateArithmetic.MIN]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_MIN
};

export const AggregateArithmetic = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection, indicator?: IndicatorForInspection) => {
			setInspection(inspection);
			if (inspection.indicatorId != null) {
				setIndicator(indicator!);
				setVisible(true);
			}
		};
		const onIndicatorPicked = (indicator: IndicatorForInspection) => {
			setIndicator(indicator);
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
		inspection!.aggregateArithmetic = option.value as PropOf<Inspection, 'aggregateArithmetic'>;
		forceUpdate();
	};

	const options = (indicator?.indicator.factorId == null)
		? [{
			value: IndicatorAggregateArithmetic.COUNT,
			label: () => {
				return {
					node: AggregateArithmeticLabel[IndicatorAggregateArithmetic.COUNT],
					label: IndicatorAggregateArithmetic.COUNT
				};
			},
			key: IndicatorAggregateArithmetic.COUNT
		}]
		: Object.values(IndicatorAggregateArithmetic).map(arithmetic => {
			return {
				value: arithmetic,
				label: () => {
					return {
						node: AggregateArithmeticLabel[arithmetic],
						label: arithmetic
					};
				},
				key: arithmetic
			};
		});

	const value = inspection?.aggregateArithmetic ?? (options.length === 1 ? IndicatorAggregateArithmetic.COUNT : IndicatorAggregateArithmetic.SUM);

	return <ValueTransformContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_LABEL}</InspectionLabel>
		<ValueTransformDropdown value={value} options={options} onChange={onOnChange}
		                        please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</ValueTransformContainer>;
};