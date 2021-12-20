import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {IndicatorCalculationFormula} from './formula';
import {IndicatorCalculationNodeContent} from './node-content';
import {Values} from './types';
import {IndicatorCalculationNode} from './widgets';

export const InternalIndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	values: Values;
}) => {
	const {navigation, navigationIndicator, values} = props;

	return <IndicatorCalculationNode error={values.failed} warn={!values.loaded}>
		<IndicatorCalculationNodeContent navigation={navigation} navigationIndicator={navigationIndicator}
		                                 values={values}/>
		<IndicatorCalculationFormula navigation={navigation} navigationIndicator={navigationIndicator}
		                             values={values}/>
	</IndicatorCalculationNode>;
};
