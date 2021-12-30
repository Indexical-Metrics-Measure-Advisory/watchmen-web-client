import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {isManualComputeNavigationIndicator} from '@/services/data/tuples/navigation-utils';
import {noop} from '@/services/utils';
import {useEffect, useLayoutEffect, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {PickedIndicator} from './indicator';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorNodeContent} from './types';

enum NodesChangeTrigger {
	ADD = 'add',
	REMOVE = 'remove'
}

interface Nodes {
	initialized: boolean;
	trigger?: NodesChangeTrigger;
	data: Array<IndicatorNodeContent>;
}

const buildNodes = (navigation: Navigation, indicators: Array<Indicator>) => {
	return (navigation.indicators || []).map((picked: NavigationIndicator) => {
		return {
			id: v4(),
			nav: picked,
			// when indicator is a manual compute, ignore indicator finding
			// eslint-disable-next-line
			indicator: isManualComputeNavigationIndicator(picked)
				? (void 0)
				// eslint-disable-next-line
				: indicators.find(indicator => indicator.indicatorId == picked.indicatorId)
		};
	});
};

export const PickedIndicators = (props: {
	rootId: string;
	paletteId: string;
	navigation: Navigation;
	indicators: Array<Indicator>;
}) => {
	const {rootId, paletteId, navigation, indicators} = props;

	const {fire: fireNavigation} = useNavigationEventBus();
	const {on, off, fire} = useNavigationEditEventBus();
	const [state, setState] = useState<Nodes>({initialized: false, data: []});
	useEffect(() => {
		setState({initialized: true, data: buildNodes(navigation, indicators)});
	}, [navigation, indicators]);
	useEffect(() => {
		const onIndicatorAdded = (aNavigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => {
			if (aNavigation !== navigation) {
				return;
			}

			fireNavigation(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
			setState(state => {
				return {
					initialized: true,
					trigger: NodesChangeTrigger.ADD,
					data: [...state.data, {id: v4(), nav: navigationIndicator, indicator}]
				};
			});
		};
		const onComputeIndicatorAdded = (aNavigation: Navigation, navigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation) {
				return;
			}

			fireNavigation(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
			setState(state => {
				return {
					initialized: true,
					trigger: NodesChangeTrigger.ADD,
					data: [...state.data, {id: v4(), nav: navigationIndicator}]
				};
			});
		};
		on(NavigationEditEventTypes.INDICATOR_ADDED, onIndicatorAdded);
		on(NavigationEditEventTypes.COMPUTE_INDICATOR_ADDED, onComputeIndicatorAdded);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_ADDED, onIndicatorAdded);
			off(NavigationEditEventTypes.COMPUTE_INDICATOR_ADDED, onComputeIndicatorAdded);
		};
	}, [on, off, fireNavigation, navigation, state.trigger]);
	useEffect(() => {
		const onIndicatorRemoved = (aNavigation: Navigation, navigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation) {
				return;
			}
			fireNavigation(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
			setState(state => {
				return {
					initialized: true,
					trigger: NodesChangeTrigger.ADD,
					data: state.data.filter(inc => inc.nav !== navigationIndicator)
				};
			});
		};
		on(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		};
	}, [on, off, fireNavigation, navigation]);
	useLayoutEffect(() => {
		if (state.trigger === NodesChangeTrigger.ADD) {
			// show last node
			const id = state.data[state.data.length - 1]?.id;
			if (id != null) {
				const node = document.getElementById(id);
				node != null && node.scrollIntoView({behavior: 'smooth'});
			}
			fire(NavigationEditEventTypes.REPAINT);
			setState(state => ({initialized: true, data: state.data}));
		} else if (state.trigger === NodesChangeTrigger.REMOVE) {
			fire(NavigationEditEventTypes.REPAINT);
			setState(state => ({initialized: true, data: state.data}));
		}
	}, [fire, state.trigger, state.data]);

	if (!state.initialized) {
		return null;
	}

	return <>
		{state.data.map(picked => {
			return <PickedIndicator paletteId={paletteId} parentId={rootId}
			                        navigation={navigation} navigationIndicator={picked.nav}
			                        indicator={picked.indicator}
			                        id={picked.id}
			                        key={picked.id}/>;
		})}
	</>;
};
