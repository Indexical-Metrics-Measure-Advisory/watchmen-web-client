import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
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
	const {fire} = useInspectionEventBus();
	const {visible, inspection, indicator} = useVisibleOnII();
	const forceUpdate = useForceUpdate();

	if (!visible) {
		return null;
	}

	const onArithmeticClicked = (arithmetic: IndicatorAggregateArithmetic) => () => {
		if (inspection!.aggregateArithmetics == null) {
			inspection!.aggregateArithmetics = [];
		}
		if (inspection!.aggregateArithmetics.includes(arithmetic)) {
			inspection!.aggregateArithmetics = inspection!.aggregateArithmetics.filter(existing => existing !== arithmetic);
		} else {
			inspection!.aggregateArithmetics.push(arithmetic);
		}
		fire(InspectionEventTypes.AGGREGATE_ARITHMETICS_CHANGED, inspection!);
		forceUpdate();
	};

	const arithmetics = (indicator?.indicator.factorId == null)
		? [IndicatorAggregateArithmetic.COUNT]
		: Object.values(IndicatorAggregateArithmetic);
	const selectedArithmetics = (() => {
		if (arithmetics.length === 0) {
			return [IndicatorAggregateArithmetic.COUNT];
		} else {
			return (inspection?.aggregateArithmetics || []).length !== 0 ? (inspection?.aggregateArithmetics ?? []) : [IndicatorAggregateArithmetic.SUM];
		}
	})();

	return <ValueTransformContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_LABEL}</InspectionLabel>
		{arithmetics.map(arithmetic => {
			const selected = selectedArithmetics.includes(arithmetic);
			return <ValueTransformButton onClick={onArithmeticClicked(arithmetic)}
			                             ink={selected ? ButtonInk.SUCCESS : ButtonInk.WAIVE}
			                             key={arithmetic}>
				{AggregateArithmeticLabel[arithmetic]}
			</ValueTransformButton>;
		})}
	</ValueTransformContainer>;
};