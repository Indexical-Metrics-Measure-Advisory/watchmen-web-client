import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {IndicatorCriteriaDefData} from '../types';
import {IndicatorPartRelationLine} from '../widgets';
import {useCriteriaValidation} from './use-criteria-validation';

export const LineToParent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = props;

	const {error, warn} = useCriteriaValidation({navigation, navigationIndicator, defData});

	return <IndicatorPartRelationLine error={error} warn={warn}/>;
};