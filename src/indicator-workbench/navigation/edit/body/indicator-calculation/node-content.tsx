import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useIndicatorValues} from './use-indicator-values';
import {computeScore, formatToNumber} from './utils';
import {IndicatorCalculationNode, IndicatorCalculationValue, IndicatorCalculationVariableName} from './widgets';

export const IndicatorCalculationNodeContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expanded: boolean;
}) => {
	const {navigation, navigationIndicator, expanded} = props;

	const {on, off, fire} = useNavigationEditEventBus();
	const {values} = useIndicatorValues(navigation, navigationIndicator);
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
	const currentValue = formatToNumber(values.current);
	const previousValue = formatToNumber(values.previous);
	const {useScore, scoreStr: score, ratioStr: ratio} = computeScore({
		script: navigationIndicator.formula,
		current: values.current,
		previous: values.previous
	});

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
		{useScore
			? <>
				<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
				<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.COMPUTED_SCORE}=</IndicatorCalculationVariableName>
				<IndicatorCalculationValue>{score}</IndicatorCalculationValue>
			</>
			: null}
		<IndicatorCalculationVariableName>]</IndicatorCalculationVariableName>
	</IndicatorCalculationNode>;
};