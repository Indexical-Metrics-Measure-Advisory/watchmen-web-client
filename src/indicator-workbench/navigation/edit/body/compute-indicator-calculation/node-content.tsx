import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {useIndicatorValuesCalculator} from '../indicator-values-calculator';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
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

	const {fire} = useNavigationEditEventBus();
	const calculatedValues = useIndicatorValuesCalculator(navigation, navigationIndicator);

	const onMouseEnter = () => {
		fire(NavigationEditEventTypes.EXPAND_CALCULATION, navigation, navigationIndicator);
	};
	const onClicked = () => {
		fire(NavigationEditEventTypes.EXPAND_CALCULATION, navigation, navigationIndicator);
	};

	return <ComputeIndicatorCalculationNode id={`calc-${id}`}
	                                        error={calculatedValues.calculateFailed}
	                                        warn={calculatedValues.shouldComputeScore && !calculatedValues.calculated}
	                                        onMouseEnter={onMouseEnter} onClick={onClicked}
	                                        expanded={expanded}>
		<ComputeIndicatorCalculationVariableName compact={true}>
			{navigationIndicator.variableName}:
		</ComputeIndicatorCalculationVariableName>
		<ComputeIndicatorCalculationVariableName>[</ComputeIndicatorCalculationVariableName>
		<ComputeIndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.COMPUTED_SCORE}=</ComputeIndicatorCalculationVariableName>
		<ComputeIndicatorCalculationValue>{calculatedValues.score?.formatted}</ComputeIndicatorCalculationValue>
		<ComputeIndicatorCalculationVariableName>]</ComputeIndicatorCalculationVariableName>
	</ComputeIndicatorCalculationNode>;
};