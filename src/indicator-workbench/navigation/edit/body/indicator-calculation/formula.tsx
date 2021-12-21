import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {InputLines} from '@/widgets/basic/input-lines';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useSavingQueue} from '@/widgets/saving-queue';
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
	const saveQueue = useSavingQueue();
	const forceUpdate = useForceUpdate();

	const onArithmeticChanged = (option: DropdownOption) => {
		const oldValue = navigationIndicator.aggregateArithmetics;
		const newValue = option.value as IndicatorAggregateArithmetic;
		if (oldValue !== newValue) {
			navigationIndicator.aggregateArithmetics = newValue;
			fireEdit(NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, navigation, navigationIndicator);
			fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
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

	const aggregateArithmeticsOptions = [
		{value: IndicatorAggregateArithmetic.SUM, label: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_SUM},
		{value: IndicatorAggregateArithmetic.AVG, label: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_AVG},
		{value: IndicatorAggregateArithmetic.COUNT, label: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_COUNT}
	];

	return <IndicatorCalculationFormulaContainer expanded={expanded}>
		<IndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_AGGREGATE_ARITHMETIC_LABEL}
		</IndicatorCalculationFormulaLabel>
		<Dropdown value={navigationIndicator.aggregateArithmetics ?? IndicatorAggregateArithmetic.SUM}
		          options={aggregateArithmeticsOptions}
		          onChange={onArithmeticChanged}/>
		<IndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_FORMULA_LABEL}
		</IndicatorCalculationFormulaLabel>
		<InputLines value={navigationIndicator.formula ?? ''} onChange={onFormulaChanged}/>
	</IndicatorCalculationFormulaContainer>;
};