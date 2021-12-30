import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {IndicatorPartRelationLine} from '../widgets';
import {useOtherIndicatorValues} from './use-other-indicator-values';

export const LineToParent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
}) => {
	const {navigation, navigationIndicator} = props;

	const {values} = useOtherIndicatorValues(navigation, navigationIndicator);

	return <IndicatorPartRelationLine error={values.failed} warn={!values.loaded}/>;
};