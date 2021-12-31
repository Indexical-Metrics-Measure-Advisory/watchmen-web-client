import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useIndicatorValuesCalculator} from '../indicator-values-calculator';
import {IndicatorPartRelationLine} from '../widgets';

export const LineToParent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
}) => {
	const {navigation, navigationIndicator} = props;

	const calculatedValues = useIndicatorValuesCalculator(navigation, navigationIndicator);

	return <IndicatorPartRelationLine error={calculatedValues.calculateFailed}
	                                  warn={calculatedValues.shouldComputeScore && !calculatedValues.calculated}/>;
};