import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {MoreIndicators} from './more-indicators';
import {IndicatorCategoryContent} from './types';
import {buildCategoryNodes} from './utils';

export const IndicatorCandidates = (props: {
	paletteId: string;
	rootId: string;
	navigation: Navigation;
	indicators: Array<Indicator>;
}) => {
	const {paletteId, rootId, navigation, indicators} = props;

	const [candidates, setCandidates] = useState<Array<IndicatorCategoryContent>>(buildCategoryNodes(indicators));
	useEffect(() => {
		setCandidates(buildCategoryNodes(indicators));
	}, [indicators]);

	return <MoreIndicators paletteId={paletteId} parentId={rootId}
	                       navigation={navigation} candidates={candidates}/>;
};