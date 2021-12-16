import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {useCurve} from './use-curve';
import {computeCurvePath} from './utils';
import {IndicatorCurve, IndicatorRootNode, IndicatorRootNodeContainer} from './widgets';

export const IndicatorRoot = (props: {
	paletteId: string;
	parentId: string;
	navigation: Navigation;
	id: string;
	index: number;
	navigationIndicator: NavigationIndicator;
	indicator?: Indicator;
}) => {
	const {parentId, id, index, indicator} = props;

	const {ref, curve} = useCurve(parentId);

	return <IndicatorRootNodeContainer>
		<IndicatorRootNode id={id} ref={ref}>
			{index}. {indicator == null ? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR : (indicator.name || 'Noname Indicator')}
		</IndicatorRootNode>
		{curve == null
			? null
			: <IndicatorCurve rect={curve}>
				<g>
					<path d={computeCurvePath(curve)}/>
				</g>
			</IndicatorCurve>}
	</IndicatorRootNodeContainer>;
};