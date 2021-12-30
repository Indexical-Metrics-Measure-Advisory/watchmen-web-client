import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {IndicatorNameEditor} from '../indicator-criteria/indicator-name-editor';

export const ComputeIndicatorNameEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
}) => {
	const {navigation, navigationIndicator} = props;

	return <IndicatorNameEditor navigation={navigation} navigationIndicator={navigationIndicator}/>;
};