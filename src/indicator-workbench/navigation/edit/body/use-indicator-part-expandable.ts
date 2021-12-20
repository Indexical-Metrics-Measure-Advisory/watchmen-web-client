import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
import {useEffect, useRef, useState} from 'react';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';

export enum Expandable {
	CRITERIA = 'criteria',
	CALCULATION = 'calculation'
}

export const useIndicatorPartExpandable = (options: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expandable: Expandable;
}) => {
	const {navigation, navigationIndicator, expandable} = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useNavigationEditEventBus();
	const [expanded, setExpanded] = useState(false);
	useCollapseFixedThing({containerRef, visible: expanded, hide: () => setExpanded(false)});
	useEffect(() => {
		const onSomethingExpanded = (avoid: Expandable) => (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation) {
				return;
			}
			if (aNavigationIndicator !== navigationIndicator || expandable === avoid) {
				setExpanded(false);
			}
		};
		const onCriteriaExpanded = onSomethingExpanded(Expandable.CALCULATION);
		const onCalculationExpanded = onSomethingExpanded(Expandable.CRITERIA);
		on(NavigationEditEventTypes.CRITERIA_EXPANDED, onCriteriaExpanded);
		on(NavigationEditEventTypes.CALCULATION_EXPANDED, onCalculationExpanded);
		return () => {
			off(NavigationEditEventTypes.CRITERIA_EXPANDED, onCriteriaExpanded);
			off(NavigationEditEventTypes.CALCULATION_EXPANDED, onCalculationExpanded);
		};
	}, [on, off, navigation, navigationIndicator, expandable]);
	useEffect(() => {
		const onExpandCriteria = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			setExpanded(true);
			switch (expandable) {
				case Expandable.CRITERIA:
					fire(NavigationEditEventTypes.CRITERIA_EXPANDED, navigation, navigationIndicator);
					break;
				case Expandable.CALCULATION:
					fire(NavigationEditEventTypes.CALCULATION_EXPANDED, navigation, navigationIndicator);
					break;
			}
		};
		switch (expandable) {
			case Expandable.CRITERIA:
				on(NavigationEditEventTypes.EXPAND_CRITERIA, onExpandCriteria);
				break;
			case Expandable.CALCULATION:
				on(NavigationEditEventTypes.EXPAND_CALCULATION, onExpandCriteria);
				break;
		}
		return () => {
			switch (expandable) {
				case Expandable.CRITERIA:
					off(NavigationEditEventTypes.EXPAND_CRITERIA, onExpandCriteria);
					break;
				case Expandable.CALCULATION:
					off(NavigationEditEventTypes.EXPAND_CALCULATION, onExpandCriteria);
					break;
			}
		};
	}, [on, off, fire, navigation, navigationIndicator, expandable]);

	return {containerRef, expanded};
};