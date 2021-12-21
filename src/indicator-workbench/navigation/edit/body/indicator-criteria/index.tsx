import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {IndicatorCriteriaDefData} from '../types';
import {IndicatorPartRelationLine} from '../widgets';
import {IndicatorCriteriaEditContent} from './indicator-criteria-edit-content';
import {IndicatorCriteriaNodeContent} from './indicator-criteria-node-content';
import {LineToParent} from './line-to-parent';
import {IndicatorCriteriaNode, IndicatorCriteriaNodeContainer} from './widgets';

export const InternalIndicatorCriteria = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, indicator, defData} = props;

	return <>
		<LineToParent navigation={navigation} navigationIndicator={navigationIndicator} defData={defData}/>
		<IndicatorCriteriaNodeContainer>
			<IndicatorCriteriaNodeContent navigation={navigation} navigationIndicator={navigationIndicator}
			                              defData={defData}/>
			<IndicatorCriteriaEditContent navigation={navigation} navigationIndicator={navigationIndicator}
			                              indicator={indicator}
			                              defData={defData}/>
		</IndicatorCriteriaNodeContainer>
	</>;
};

export const IndicatorCriteria = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, indicator, defData} = props;

	if (!defData.loaded) {
		return <>
			<IndicatorPartRelationLine/>
			<IndicatorCriteriaNode>
				{Lang.INDICATOR_WORKBENCH.NAVIGATION.LOADING_CRITERIA_DEF}
			</IndicatorCriteriaNode>
		</>;
	}

	return <InternalIndicatorCriteria navigation={navigation} navigationIndicator={navigationIndicator}
	                                  indicator={indicator} defData={defData}/>;
};