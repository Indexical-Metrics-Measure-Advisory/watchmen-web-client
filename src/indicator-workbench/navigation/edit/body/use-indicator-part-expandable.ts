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
		const onSomethingExpanded = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation) {
				return;
			}
			if (aNavigationIndicator !== navigationIndicator) {
				setExpanded(false);
			}
		};
		on(NavigationEditEventTypes.CRITERIA_EXPANDED, onSomethingExpanded);
		on(NavigationEditEventTypes.CALCULATION_EXPANDED, onSomethingExpanded);
		return () => {
			off(NavigationEditEventTypes.CRITERIA_EXPANDED, onSomethingExpanded);
			off(NavigationEditEventTypes.CALCULATION_EXPANDED, onSomethingExpanded);
		};
	}, [on, off, navigation, navigationIndicator]);
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