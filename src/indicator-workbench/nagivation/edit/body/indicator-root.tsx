import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {NavigationIndicatorContent} from './indicator-content';
import {useCurve} from './use-curve';
import {computeCurvePath} from './utils';
import {IndicatorCurve, IndicatorRootNode, IndicatorRootNodeContainer} from './widgets';

const IndicatorRootNodeWrapper = (props: {
	parentId: string;
	id: string;
	index: number;
	indicator?: Indicator;
}) => {
	const {parentId, id, index, indicator} = props;

	const {ref, curve} = useCurve(parentId);

	return <>
		<IndicatorRootNode id={id} error={indicator == null} ref={ref}>
			<span>{index}.</span>
			<span>{indicator == null ? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR : (indicator.name || 'Noname Indicator')}</span>
		</IndicatorRootNode>
		{curve == null
			? null
			: <IndicatorCurve rect={curve}>
				<g>
					<path d={computeCurvePath(curve)}/>
				</g>
			</IndicatorCurve>}
	</>;
};

export const IndicatorRoot = (props: {
	paletteId: string;
	parentId: string;
	navigation: Navigation;
	id: string;
	index: number;
	navigationIndicator: NavigationIndicator;
	indicator?: Indicator;
}) => {
	const {parentId, navigation, id, index, navigationIndicator, indicator} = props;

	return <IndicatorRootNodeContainer>
		<IndicatorRootNodeWrapper parentId={parentId} id={id} index={index} indicator={indicator}/>
		{indicator == null
			? null
			: <NavigationIndicatorContent navigation={navigation} navigationIndicator={navigationIndicator}
			                              indicator={indicator}/>}
	</IndicatorRootNodeContainer>;
};