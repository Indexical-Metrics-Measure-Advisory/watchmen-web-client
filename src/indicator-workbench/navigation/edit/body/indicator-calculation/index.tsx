import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {IndicatorValuesCalculator} from '../indicator-values-calculator';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {Expandable, useIndicatorPartExpandable} from '../use-indicator-part-expandable';
import {isReadyToCalculation} from '../utils';
import {Calculator} from './calculator';
import {IndicatorCalculationFormula} from './formula';
import {LineToParent} from './line-to-parent';
import {IndicatorCalculationNodeContent} from './node-content';
import {IndicatorCalculationNodeContainer} from './widgets';

const InternalIndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
	id: string;
}) => {
	const {navigation, navigationIndicator, defData, id} = props;

	const {containerRef, expanded} = useIndicatorPartExpandable({
		navigation,
		navigationIndicator,
		expandable: Expandable.CALCULATION
	});

	return <>
		<LineToParent navigation={navigation} navigationIndicator={navigationIndicator}/>
		<IndicatorCalculationNodeContainer ref={containerRef}>
			<IndicatorCalculationNodeContent id={id} navigation={navigation} navigationIndicator={navigationIndicator}
			                                 expanded={expanded}/>
			<IndicatorCalculationFormula navigation={navigation} navigationIndicator={navigationIndicator}
			                             expanded={expanded}/>
		</IndicatorCalculationNodeContainer>
		<IndicatorValuesCalculator navigation={navigation} navigationIndicator={navigationIndicator}/>
		<Calculator navigation={navigation} navigationIndicator={navigationIndicator} defData={defData}/>
	</>;
};

export const IndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
	id: string;
}) => {
	const {navigation, navigationIndicator, defData, id} = props;

	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const [ready, setReady] = useState(isReadyToCalculation(navigation, navigationIndicator, defData));
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			const newReady = isReadyToCalculation(navigation, navigationIndicator, defData);
			if (newReady !== ready) {
				setReady(newReady);
			}
		};
		const onTimeRangeChanged = (aNavigation: Navigation) => {
			if (aNavigation !== navigation) {
				return;
			}

			const newReady = isReadyToCalculation(navigation, navigationIndicator, defData);
			if (newReady !== ready) {
				setReady(newReady);
			}
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
	}, [onEdit, offEdit, navigation, navigationIndicator, defData, ready]);

	if (!ready) {
		return null;
	}

	return <InternalIndicatorCalculation id={id} navigation={navigation} navigationIndicator={navigationIndicator}
	                                     defData={defData}/>;
};