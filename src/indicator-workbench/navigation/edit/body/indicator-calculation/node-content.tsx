import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {Values} from './types';
import {computeRatio, formatToNumber} from './utils';
import {IndicatorCalculationValue, IndicatorCalculationVariableName} from './widgets';

export const IndicatorCalculationNodeContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	values: Values;
}) => {
	const {navigation, navigationIndicator, values} = props;

	const index = (navigation.indicators || []).indexOf(navigationIndicator) + 1;
	const currentValue = formatToNumber(values.current);
	const previousValue = formatToNumber(values.previous);
	const ratio = computeRatio(values.current, values.previous);

	return <>
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
	</>;
};