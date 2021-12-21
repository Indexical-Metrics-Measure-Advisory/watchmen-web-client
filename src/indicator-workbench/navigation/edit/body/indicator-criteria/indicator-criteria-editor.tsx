import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator, NavigationIndicatorCriteria} from '@/services/data/tuples/navigation-types';
import {DropdownOption} from '@/widgets/basic/types';
import {IndicatorCriteriaDefData} from '../types';
import {IndicatorCriteriaArithmeticEditor} from './indicator-criteria-arithmetic-editor';
import {IndicatorCriteriaFactorEditor} from './indicator-criteria-factor-editor';
import {IndicatorCriteriaOperators} from './indicator-criteria-operators';
import {IndicatorCriteriaValueEditor} from './indicator-criteria-value-editor';
import {IndicatorCriteriaIndex, IndicatorCriteriaRow} from './widgets';

export const IndicatorCriteriaEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
	indicator: Indicator;
	factorCandidates: Array<DropdownOption>;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, criteria, indicator, factorCandidates, defData} = props;

	const index = (navigationIndicator.criteria || []).indexOf(criteria) + 1;

	return <IndicatorCriteriaRow>
		<IndicatorCriteriaIndex>{index === 0 ? (navigationIndicator.criteria || []).length + 1 : index}</IndicatorCriteriaIndex>
		<IndicatorCriteriaFactorEditor navigation={navigation} navigationIndicator={navigationIndicator}
		                               criteria={criteria} defData={defData}
		                               factorCandidates={factorCandidates} indicator={indicator}/>
		<IndicatorCriteriaArithmeticEditor navigation={navigation} navigationIndicator={navigationIndicator}
		                                   criteria={criteria} defData={defData} indicator={indicator}/>
		<IndicatorCriteriaValueEditor navigation={navigation} navigationIndicator={navigationIndicator}
		                              criteria={criteria} defData={defData}/>
		<IndicatorCriteriaOperators navigation={navigation} navigationIndicator={navigationIndicator}
		                            criteria={criteria}/>
	</IndicatorCriteriaRow>;
};