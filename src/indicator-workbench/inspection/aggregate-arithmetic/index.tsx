import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useVisibleOnII} from '../use-visible-on-ii';
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
	const {visible, inspection, indicator} = useVisibleOnII();
	const forceUpdate = useForceUpdate();

	if (!visible) {
		return null;
	}

	const onOnChange = (option: DropdownOption) => {
		inspection!.aggregateArithmetic = option.value as IndicatorAggregateArithmetic;
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