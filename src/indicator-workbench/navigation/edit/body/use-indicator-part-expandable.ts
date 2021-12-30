import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
import {useEffect, useRef, useState} from 'react';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';

export enum Expandable {
	NAME = 'name',
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
		const onSomethingExpanded = (accepted: Expandable) => (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation) {
				return;
			}
			if (aNavigationIndicator !== navigationIndicator || expandable !== accepted) {
				setExpanded(false);
			}
		};
		const onNameExpanded = onSomethingExpanded(Expandable.NAME);
		const onCriteriaExpanded = onSomethingExpanded(Expandable.CRITERIA);
		const onCalculationExpanded = onSomethingExpanded(Expandable.CALCULATION);
		on(NavigationEditEventTypes.NAME_EXPANDED, onNameExpanded);
		on(NavigationEditEventTypes.CRITERIA_EXPANDED, onCriteriaExpanded);
		on(NavigationEditEventTypes.CALCULATION_EXPANDED, onCalculationExpanded);
		return () => {
			off(NavigationEditEventTypes.NAME_EXPANDED, onNameExpanded);
			off(NavigationEditEventTypes.CRITERIA_EXPANDED, onCriteriaExpanded);
			off(NavigationEditEventTypes.CALCULATION_EXPANDED, onCalculationExpanded);
		};
	}, [on, off, navigation, navigationIndicator, expandable]);
	useEffect(() => {
		const onExpand = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			setExpanded(true);
			switch (expandable) {
				case Expandable.NAME:
					fire(NavigationEditEventTypes.NAME_EXPANDED, navigation, navigationIndicator);
					break;
				case Expandable.CRITERIA:
					fire(NavigationEditEventTypes.CRITERIA_EXPANDED, navigation, navigationIndicator);
					break;
				case Expandable.CALCULATION:
					fire(NavigationEditEventTypes.CALCULATION_EXPANDED, navigation, navigationIndicator);
					break;
			}
		};
		switch (expandable) {
			case Expandable.NAME:
				on(NavigationEditEventTypes.EXPAND_NAME, onExpand);
				break;
			case Expandable.CRITERIA:
				on(NavigationEditEventTypes.EXPAND_CRITERIA, onExpand);
				break;
			case Expandable.CALCULATION:
				on(NavigationEditEventTypes.EXPAND_CALCULATION, onExpand);
				break;
		}
		return () => {
			switch (expandable) {
				case Expandable.NAME:
					off(NavigationEditEventTypes.EXPAND_NAME, onExpand);
					break;
				case Expandable.CRITERIA:
					off(NavigationEditEventTypes.EXPAND_CRITERIA, onExpand);
					break;
				case Expandable.CALCULATION:
					off(NavigationEditEventTypes.EXPAND_CALCULATION, onExpand);
					break;
			}
		};
	}, [on, off, fire, navigation, navigationIndicator, expandable]);

	return {containerRef, expanded};
};