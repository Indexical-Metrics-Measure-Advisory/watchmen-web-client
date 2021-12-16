import {PropOf} from '@/services/types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_ADD} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {v4} from 'uuid';
import {IndicatorCategory} from './indicator-category';
import {CategoryNodes} from './types';
import {useCurve} from './use-curve';
import {
	MoreIndicatorsColumn,
	MoreIndicatorsContainer,
	MoreIndicatorsCurve,
	MoreIndicatorsNode,
	MoreIndicatorsNodeContainer
} from './widgets';

export const MoreIndicators = (props: { paletteId: string; rootId: string; candidates: PropOf<CategoryNodes, 'candidates'> }) => {
	const {paletteId, rootId, candidates} = props;

	const {fire: fireGlobal} = useEventBus();
	const {ref, curve} = useCurve(rootId);
	const [id] = useState(v4());
	const [expanded, setExpanded] = useState(false);

	const onMoreClicked = () => {
		if (candidates.length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.NAVIGATION.NO_INDICATOR_CANDIDATE}
			</AlertLabel>);
			return;
		}

		setExpanded(!expanded);
	};

	return <MoreIndicatorsContainer>
		<MoreIndicatorsColumn>
			<MoreIndicatorsNodeContainer>
				<MoreIndicatorsNode id={id} onClick={onMoreClicked} ref={ref}>
					<FontAwesomeIcon icon={ICON_ADD}/>
				</MoreIndicatorsNode>
				{curve == null
					? null
					: <MoreIndicatorsCurve rect={curve}>
						<g>
							<path
								d={`M${curve.startX},${curve.startY} C${(curve.endX - curve.startX) / 4 * 3},${curve.startY} ${(curve.endX - curve.startX) / 4},${curve.endY} ${curve.endX},${curve.endY}`}/>
						</g>
					</MoreIndicatorsCurve>}
			</MoreIndicatorsNodeContainer>
		</MoreIndicatorsColumn>
		<MoreIndicatorsColumn>
			{candidates.map(candidate => {
				return <IndicatorCategory paletteId={paletteId} parentId={id} category={candidate}
				                          key={candidate.name}/>;
			})}
		</MoreIndicatorsColumn>
	</MoreIndicatorsContainer>;
};