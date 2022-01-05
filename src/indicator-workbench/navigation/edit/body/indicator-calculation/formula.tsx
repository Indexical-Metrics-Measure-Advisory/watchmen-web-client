import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {CheckBox} from '@/widgets/basic/checkbox';
import {Dropdown} from '@/widgets/basic/dropdown';
import {InputLines} from '@/widgets/basic/input-lines';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useThrottler} from '@/widgets/throttler';
import {ChangeEvent} from 'react';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCalculationFormulaContainer, IndicatorCalculationFormulaLabel} from './widgets';

export const IndicatorCalculationFormula = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expanded: boolean;
}) => {
	const {navigation, navigationIndicator, expanded} = props;

	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const saveQueue = useThrottler();
	const forceUpdate = useForceUpdate();

	const onArithmeticChanged = (option: DropdownOption) => {
		const oldValue = navigationIndicator.aggregateArithmetic;
		const newValue = option.value as IndicatorAggregateArithmetic;
		if (oldValue !== newValue) {
			navigationIndicator.aggregateArithmetic = newValue;
			fireEdit(NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, navigation, navigationIndicator);
			fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
			forceUpdate();
		}
	};
	const onFormulaChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
		navigationIndicator.formula = event.target.value;
		saveQueue.replace(() => {
			fireEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, navigation, navigationIndicator);
			fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		}, 300);
		forceUpdate();
	};
	const onIncludeInFinalScoreChanged = (value: boolean) => {
		navigationIndicator.includeInFinalScore = value;
		fireEdit(NavigationEditEventTypes.INDICATOR_SCORE_INCLUDE_CHANGED, navigation, navigationIndicator);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	const aggregateArithmeticsOptions = [
		{value: IndicatorAggregateArithmetic.SUM, label: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_SUM},
		{value: IndicatorAggregateArithmetic.AVG, label: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_AVG},
		{value: IndicatorAggregateArithmetic.COUNT, label: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_COUNT}
	];
	const placeholder = `c: value of current period,
p: value of previous period,
r: value of increment.
eg 1: c - p;
eg 2: interpolation(r, -0.2, 5, 0.2, 20)`;

	return <IndicatorCalculationFormulaContainer expanded={expanded}>
		<IndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_AGGREGATE_ARITHMETIC_LABEL}
		</IndicatorCalculationFormulaLabel>
		<Dropdown value={navigationIndicator.aggregateArithmetic ?? IndicatorAggregateArithmetic.SUM}
		          options={aggregateArithmeticsOptions}
		          onChange={onArithmeticChanged}/>
		<IndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_FORMULA_LABEL}
		</IndicatorCalculationFormulaLabel>
		<InputLines value={navigationIndicator.formula ?? ''} onChange={onFormulaChanged}
		            placeholder={placeholder}/>
		<IndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.SCORE_INCLUDE_IN_FINAL}
		</IndicatorCalculationFormulaLabel>
		<CheckBox value={navigationIndicator.includeInFinalScore ?? true} onChange={onIncludeInFinalScoreChanged}/>
	</IndicatorCalculationFormulaContainer>;
};