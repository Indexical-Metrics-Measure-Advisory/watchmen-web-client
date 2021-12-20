import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useIndicatorValues} from './use-indicator-values';
import {computeRatio, formatToNumber} from './utils';
import {IndicatorCalculationNode, IndicatorCalculationValue, IndicatorCalculationVariableName} from './widgets';

export const IndicatorCalculationNodeContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expanded: boolean;
}) => {
	const {navigation, navigationIndicator, expanded} = props;

	const {fire} = useNavigationEditEventBus();
	const {values} = useIndicatorValues(navigation, navigationIndicator);

	const onMouseEnter = () => {
		fire(NavigationEditEventTypes.EXPAND_CALCULATION, navigation, navigationIndicator);
	};
	const onClicked = () => {
		fire(NavigationEditEventTypes.EXPAND_CALCULATION, navigation, navigationIndicator);
	};

	const index = (navigation.indicators || []).indexOf(navigationIndicator) + 1;
	const currentValue = formatToNumber(values.current);
	const previousValue = formatToNumber(values.previous);
	const ratio = computeRatio(values.current, values.previous);

	return <IndicatorCalculationNode error={values.failed} warn={!values.loaded}
	                                 onMouseEnter={onMouseEnter} onClick={onClicked}
	                                 expanded={expanded}>
		<IndicatorCalculationVariableName compact={true}>v{index}:</IndicatorCalculationVariableName>
		<IndicatorCalculationVariableName>[</IndicatorCalculationVariableName>
		<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.CURRENT_VALUE}=</IndicatorCalculationVariableName>
		<IndicatorCalculationValue>{currentValue}</IndicatorCalculationValue>
		{navigation.compareWithPreviousTimeRange
			? <>
				<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
				<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.PREVIOUS_VALUE}=</IndicatorCalculationVariableName>
				<IndicatorCalculationValue>{previousValue}</IndicatorCalculationValue>
				<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
				<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.INCREMENT_RATIO}=</IndicatorCalculationVariableName>
				<IndicatorCalculationValue>{ratio}</IndicatorCalculationValue>
				<IndicatorCalculationValue>%</IndicatorCalculationValue>
			</>
			: null}
		<IndicatorCalculationVariableName>]</IndicatorCalculationVariableName>
	</IndicatorCalculationNode>;
};