import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {useIndicatorValuesCalculator} from '../indicator-values-calculator';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCalculationNode, IndicatorCalculationValue, IndicatorCalculationVariableName} from './widgets';

export const IndicatorCalculationNodeContent = (props: {
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

	return <IndicatorCalculationNode id={`calc-${id}`} error={calculatedValues.loadFailed}
	                                 warn={!calculatedValues.calculated}
	                                 onMouseEnter={onMouseEnter} onClick={onClicked}
	                                 expanded={expanded}>
		<IndicatorCalculationVariableName compact={true}>
			{navigationIndicator.variableName}:
		</IndicatorCalculationVariableName>
		<IndicatorCalculationVariableName>[</IndicatorCalculationVariableName>
		<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.CURRENT_VALUE}=</IndicatorCalculationVariableName>
		<IndicatorCalculationValue>{calculatedValues.current?.formatted}</IndicatorCalculationValue>
		{navigation.compareWithPreviousTimeRange
			? <>
				<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
				<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.PREVIOUS_VALUE}=</IndicatorCalculationVariableName>
				<IndicatorCalculationValue>{calculatedValues.previous?.formatted}</IndicatorCalculationValue>
				<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
				<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.INCREMENT_RATIO}=</IndicatorCalculationVariableName>
				<IndicatorCalculationValue>{calculatedValues.ratio?.formatted}</IndicatorCalculationValue>
				<IndicatorCalculationValue>%</IndicatorCalculationValue>
			</>
			: null}
		{calculatedValues.shouldComputeScore
			? <>
				<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
				<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.COMPUTED_SCORE}=</IndicatorCalculationVariableName>
				<IndicatorCalculationValue>{calculatedValues.score?.formatted}</IndicatorCalculationValue>
			</>
			: null}
		<IndicatorCalculationVariableName>]</IndicatorCalculationVariableName>
	</IndicatorCalculationNode>;
};