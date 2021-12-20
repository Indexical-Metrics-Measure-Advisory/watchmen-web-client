import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {isReadyToCalculation} from '../utils';
import {IndicatorPartRelationLine} from '../widgets';
import {IndicatorCriteriaEditContent} from './indicator-criteria-edit-content';
import {IndicatorCriteriaNode} from './widgets';

const MissedTopic = (props: { topic?: Topic }) => {
	const {topic} = props;

	if (topic != null) {
		return null;
	}

	return <>
		{Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR_TOPIC}
	</>;
};

const ExpressionCountLabel = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	topic?: Topic;
}) => {
	const {navigationIndicator, topic} = props;
	const {criteria = []} = navigationIndicator;

	if (topic == null) {
		return null;
	}

	if (criteria.length === 0) {
		return <>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.NO_INDICATOR_CRITERIA_DEFINED}
		</>;
	} else {
		return <span>
			{criteria.length} {Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_CRITERIA_DEFINED}
		</span>;
	}
};

export const InternalIndicatorCriteria = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, indicator, defData} = props;

	const {on, off} = useNavigationEditEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator]);

	const onMouseEnter = () => {
		fireEdit(NavigationEditEventTypes.EXPAND_CRITERIA, navigation, navigationIndicator);
	};
	const onClicked = () => {
		fireEdit(NavigationEditEventTypes.EXPAND_CRITERIA, navigation, navigationIndicator);
	};

	const error = defData.loaded && defData.topic == null;
	const warn = !isReadyToCalculation(navigation, navigationIndicator, defData);

	return <>
		<IndicatorPartRelationLine error={error} warn={warn}/>
		<IndicatorCriteriaNode error={error} warn={warn}
		                       onMouseEnter={onMouseEnter} onClick={onClicked}>
			<MissedTopic topic={defData.topic}/>
			<ExpressionCountLabel navigation={navigation} navigationIndicator={navigationIndicator}
			                      topic={defData.topic}/>
			<IndicatorCriteriaEditContent navigation={navigation} navigationIndicator={navigationIndicator}
			                              indicator={indicator}
			                              defData={defData}/>
		</IndicatorCriteriaNode>
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