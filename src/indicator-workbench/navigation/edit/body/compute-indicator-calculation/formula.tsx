import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {CheckBox} from '@/widgets/basic/checkbox';
import {InputLines} from '@/widgets/basic/input-lines';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useThrottler} from '@/widgets/throttler';
import {ChangeEvent} from 'react';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {ComputeIndicatorCalculationFormulaContainer, ComputeIndicatorCalculationFormulaLabel} from './widgets';

export const ComputeIndicatorCalculationFormula = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expanded: boolean;
}) => {
	const {navigation, navigationIndicator, expanded} = props;

	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const saveQueue = useThrottler();
	const forceUpdate = useForceUpdate();

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

	const placeholder = `v1.c: current value of v1,
v1.p: previous value of v1,
v1.r: increment value of v1,
v1.s: score value of v1,
and v2.c/v2.p/v2.r/v2.s ... vn.c/vn.p/vn.r/vn.s
eg 1: v1.c - v1.p;
eg 2: interpolation(v1.r, -0.2, 5, 0.2, 20)`;

	return <ComputeIndicatorCalculationFormulaContainer expanded={expanded}>
		<ComputeIndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_FORMULA_LABEL}
		</ComputeIndicatorCalculationFormulaLabel>
		<InputLines value={navigationIndicator.formula ?? ''} onChange={onFormulaChanged}
		            placeholder={placeholder}/>
		<ComputeIndicatorCalculationFormulaLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.SCORE_INCLUDE_IN_FINAL}
		</ComputeIndicatorCalculationFormulaLabel>
		<CheckBox value={navigationIndicator.includeInFinalScore ?? true} onChange={onIncludeInFinalScoreChanged}/>
	</ComputeIndicatorCalculationFormulaContainer>;
};