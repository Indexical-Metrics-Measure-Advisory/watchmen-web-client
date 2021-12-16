import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {useEffect, useLayoutEffect, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {IndicatorRoot} from './indicator-root';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorNodeContent} from './types';

enum NodesChangeTrigger {
	INITIALIZE = 'initialize',
	ADD = 'add',
	REMOVE = 'remove'
}

interface Nodes {
	trigger: NodesChangeTrigger;
	data: Array<IndicatorNodeContent>;
}

const buildNodes = (navigation: Navigation, indicators: Array<Indicator>) => {
	return (navigation.indicators || []).map(picked => {
		return {
			id: v4(),
			nav: picked,
			// eslint-disable-next-line
			indicator: indicators.find(indicator => indicator.indicatorId == picked.indicatorId)
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
	const [state, setState] = useState<Nodes>({
		trigger: NodesChangeTrigger.INITIALIZE,
		data: buildNodes(navigation, indicators)
	});
	useEffect(() => {
		setState({trigger: NodesChangeTrigger.INITIALIZE, data: buildNodes(navigation, indicators)});
	}, [navigation, indicators]);
	useEffect(() => {
		const onIndicatorAdded = (aNavigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => {
			if (aNavigation !== navigation) {
				return;
			}

			fireNavigation(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
			setState(state => {
				return {
					trigger: NodesChangeTrigger.ADD,
					data: [...state.data, {id: v4(), nav: navigationIndicator, indicator}]
				};
			});
		};
		on(NavigationEditEventTypes.INDICATOR_ADDED, onIndicatorAdded);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_ADDED, onIndicatorAdded);
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
		} else if (state.trigger === NodesChangeTrigger.REMOVE) {
			fire(NavigationEditEventTypes.REPAINT);
		}
	}, [fire, state.trigger, state.data]);

	return <>
		{state.data.map(picked => {
			return <IndicatorRoot paletteId={paletteId} parentId={rootId}
			                      navigation={navigation} navigationIndicator={picked.nav} indicator={picked.indicator}
			                      id={picked.id}
			                      key={picked.id}/>;
		})}
	</>;
};
