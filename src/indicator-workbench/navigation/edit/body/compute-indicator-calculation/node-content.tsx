import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useOtherIndicatorValues} from './use-other-indicator-values';
import {
	ComputeIndicatorCalculationNode,
	ComputeIndicatorCalculationValue,
	ComputeIndicatorCalculationVariableName
} from './widgets';

export const ComputeIndicatorCalculationNodeContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expanded: boolean;
	id: string;
}) => {
	const {navigation, navigationIndicator, expanded, id} = props;

	const {on, off, fire} = useNavigationEditEventBus();
	const {values} = useOtherIndicatorValues(navigation, navigationIndicator);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onFormulaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator]);

	const onMouseEnter = () => {
		fire(NavigationEditEventTypes.EXPAND_CALCULATION, navigation, navigationIndicator);
	};
	const onClicked = () => {
		fire(NavigationEditEventTypes.EXPAND_CALCULATION, navigation, navigationIndicator);
	};

	const index = (navigation.indicators || []).indexOf(navigationIndicator) + 1;
	// TODO
	const score = 0;

	return <ComputeIndicatorCalculationNode id={`calc-${id}`} error={values.failed} warn={!values.loaded}
	                                        onMouseEnter={onMouseEnter} onClick={onClicked}
	                                        expanded={expanded}>
		<ComputeIndicatorCalculationVariableName compact={true}>v{index}:</ComputeIndicatorCalculationVariableName>
		<ComputeIndicatorCalculationVariableName>[</ComputeIndicatorCalculationVariableName>
		<ComputeIndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.COMPUTED_SCORE}=</ComputeIndicatorCalculationVariableName>
		<ComputeIndicatorCalculationValue>{score}</ComputeIndicatorCalculationValue>
		<ComputeIndicatorCalculationVariableName>]</ComputeIndicatorCalculationVariableName>
	</ComputeIndicatorCalculationNode>;
};