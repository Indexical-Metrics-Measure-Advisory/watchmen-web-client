import {Calculator} from '@/indicator-workbench/navigation/edit/body/indicator-calculation/calculator';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {Expandable, useIndicatorPartExpandable} from '../use-indicator-part-expandable';
import {isReadyToCalculation} from '../utils';
import {IndicatorCalculationFormula} from './formula';
import {LineToParent} from './line-to-parent';
import {IndicatorCalculationNodeContent} from './node-content';
import {IndicatorCalculationNodeContainer} from './widgets';

const InternalIndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = props;

	const {containerRef, expanded} = useIndicatorPartExpandable({
		navigation,
		navigationIndicator,
		expandable: Expandable.CALCULATION
	});

	return <>
		<LineToParent navigation={navigation} navigationIndicator={navigationIndicator}/>
		<IndicatorCalculationNodeContainer ref={containerRef}>
			<IndicatorCalculationNodeContent navigation={navigation} navigationIndicator={navigationIndicator}
			                                 expanded={expanded}/>
			<IndicatorCalculationFormula navigation={navigation} navigationIndicator={navigationIndicator}
			                             expanded={expanded}/>
		</IndicatorCalculationNodeContainer>
		<Calculator navigation={navigation} navigationIndicator={navigationIndicator} defData={defData}/>
	</>;
};

export const IndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = props;

	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			forceUpdate();
		};
		const onTimeRangeChanged = (aNavigation: Navigation) => {
			if (aNavigation !== navigation) {
				return;
			}

			forceUpdate();
		};
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		};
	}, [onEdit, offEdit, forceUpdate, navigation, navigationIndicator]);

	if (!isReadyToCalculation(navigation, navigationIndicator, defData)) {
		return null;
	}

	return <InternalIndicatorCalculation navigation={navigation} navigationIndicator={navigationIndicator}
	                                     defData={defData}/>;
};