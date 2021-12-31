import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {MoreIndicators} from './more-indicators';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorCategoryContent} from './types';
import {useShowAddIndicator} from './use-show-add-indicator';
import {buildCategoryNodes} from './utils';

interface CandidatesState {
	initialized: boolean;
	data: Array<IndicatorCategoryContent>;
}

export const IndicatorCandidates = (props: {
	paletteId: string;
	rootId: string;
	navigation: Navigation;
	indicators: Array<Indicator>;
}) => {
	const {paletteId, rootId, navigation, indicators} = props;

	const {fire: fireEdit} = useNavigationEditEventBus();
	const [state, setState] = useState<CandidatesState>({initialized: false, data: []});
	const visible = useShowAddIndicator(navigation);
	useEffect(() => {
		fireEdit(NavigationEditEventTypes.REPAINT);
	}, [fireEdit, visible, navigation]);
	useEffect(() => {
		setState({initialized: true, data: buildCategoryNodes(indicators)});
	}, [indicators]);

	if (!visible || !state.initialized) {
		return null;
	}

	return <MoreIndicators paletteId={paletteId} parentId={rootId}
	                       navigation={navigation} candidates={state.data}/>;
};