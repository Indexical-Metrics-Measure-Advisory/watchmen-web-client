import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {MoreIndicators} from './more-indicators';
import {IndicatorCategoryContent} from './types';
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

	const [state, setState] = useState<CandidatesState>({initialized: false, data: []});
	useEffect(() => {
		setState({initialized: true, data: buildCategoryNodes(indicators)});
	}, [indicators]);

	if (!state.initialized) {
		return null;
	}

	return <MoreIndicators paletteId={paletteId} parentId={rootId}
	                       navigation={navigation} candidates={state.data}/>;
};