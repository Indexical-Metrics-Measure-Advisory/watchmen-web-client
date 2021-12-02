import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useVisibleOnII} from '../use-visible-on-ii';
import {InspectionLabel} from '../widgets';
import {ValueTransformButton, ValueTransformContainer} from './widgets';

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

	const onArithmeticClicked = (arithmetic: IndicatorAggregateArithmetic) => () => {
		if (inspection!.aggregateArithmetics == null) {
			inspection!.aggregateArithmetics = [];
		}
		if (inspection!.aggregateArithmetics!.includes(arithmetic)) {
			inspection!.aggregateArithmetics = inspection!.aggregateArithmetics.filter(existing => existing !== arithmetic);
		} else {
			inspection!.aggregateArithmetics.push(arithmetic);
		}
		forceUpdate();
	};

	const arithmetics = (indicator?.indicator.factorId == null)
		? [IndicatorAggregateArithmetic.COUNT]
		: Object.values(IndicatorAggregateArithmetic);

	return <ValueTransformContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_LABEL}</InspectionLabel>
		{arithmetics.map(arithmetic => {
			const selected = !!inspection?.aggregateArithmetics?.includes(arithmetic);
			return <ValueTransformButton onClick={onArithmeticClicked(arithmetic)}
			                             ink={selected ? ButtonInk.SUCCESS : ButtonInk.WAIVE}
			                             key={arithmetic}>
				{AggregateArithmeticLabel[arithmetic]}
			</ValueTransformButton>;
		})}
	</ValueTransformContainer>;
};