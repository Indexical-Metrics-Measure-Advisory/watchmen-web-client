import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Values} from './types';
import {IndicatorCalculationFormulaContainer} from './widgets';

export const IndicatorCalculationFormula = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	values: Values;
}) => {
	const {navigation, navigationIndicator} = props;

	return <IndicatorCalculationFormulaContainer>

	</IndicatorCalculationFormulaContainer>;
};