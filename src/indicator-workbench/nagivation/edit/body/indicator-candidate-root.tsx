import {Indicator} from '@/services/data/tuples/indicator-types';
import {Lang} from '@/widgets/langs';
import {useCurve} from './use-curve';
import {computeCurvePath} from './utils';
import {IndicatorCandidateRootNode, IndicatorCurve, IndicatorRootNodeContainer} from './widgets';

export const IndicatorCandidateRoot = (props: { paletteId: string; parentId: string; indicator?: Indicator }) => {
	const {parentId, indicator} = props;

	const {ref, curve} = useCurve(parentId);

	return <IndicatorRootNodeContainer>
		<IndicatorCandidateRootNode ref={ref}>
			{indicator == null ? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR : (indicator.name || 'Noname Indicator')}
		</IndicatorCandidateRootNode>
		{curve == null
			? null
			: <IndicatorCurve rect={curve}>
				<g>
					<path d={computeCurvePath(curve)}/>
				</g>
			</IndicatorCurve>}
	</IndicatorRootNodeContainer>;
};