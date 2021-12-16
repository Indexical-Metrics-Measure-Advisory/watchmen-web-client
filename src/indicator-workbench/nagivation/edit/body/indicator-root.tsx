import {Indicator} from '@/services/data/tuples/indicator-types';
import {Lang} from '@/widgets/langs';
import {useCurve} from './use-curve';
import {IndicatorCurve, IndicatorRootNode, IndicatorRootNodeContainer} from './widgets';

export const IndicatorRoot = (props: { paletteId: string; parentId: string; indicator?: Indicator }) => {
	const {parentId, indicator} = props;

	const {ref, curve} = useCurve(parentId);

	return <IndicatorRootNodeContainer>
		<IndicatorRootNode ref={ref}>
			{indicator == null ? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR : (indicator.name || 'Noname Indicator')}
		</IndicatorRootNode>
		{curve == null
			? null
			: <IndicatorCurve rect={curve}>
				<g>
					<path
						d={`M${curve.startX},${curve.startY} C${(curve.endX - curve.startX) / 4 * 3},${curve.startY} ${(curve.endX - curve.startX) / 4},${curve.endY} ${curve.endX},${curve.endY}`}/>
				</g>
			</IndicatorCurve>}
	</IndicatorRootNodeContainer>;
};