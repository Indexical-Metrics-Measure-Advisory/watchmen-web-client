import {Navigation} from '@/services/data/tuples/navigation-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_COLLAPSE_NODES, ICON_EXPAND_NODES} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {IndicatorCategory} from '../category';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCategoryContent} from '../types';
import {useCurve} from '../use-curve';
import {computeCurvePath} from '../utils';
import {
	MoreIndicatorsColumn,
	MoreIndicatorsContainer,
	MoreIndicatorsCurve,
	MoreIndicatorsNode,
	MoreIndicatorsNodeContainer
} from './widgets';

export const MoreIndicators = (props: {
	paletteId: string;
	parentId: string;
	navigation: Navigation;
	candidates: Array<IndicatorCategoryContent>;
}) => {
	const {paletteId, parentId, navigation, candidates} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useNavigationEditEventBus();
	const {ref, curve} = useCurve(parentId);
	const [id] = useState(v4());
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		fire(NavigationEditEventTypes.REPAINT);
	}, [fire, expanded]);

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
					<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_NODES : ICON_EXPAND_NODES}/>
				</MoreIndicatorsNode>
				{curve == null
					? null
					: <MoreIndicatorsCurve rect={curve}>
						<g>
							<path d={computeCurvePath(curve)}/>
						</g>
					</MoreIndicatorsCurve>}
			</MoreIndicatorsNodeContainer>
		</MoreIndicatorsColumn>
		{expanded
			? <MoreIndicatorsColumn>
				{candidates.map(candidate => {
					return <IndicatorCategory paletteId={paletteId} parentId={id} navigation={navigation}
					                          category={candidate}
					                          key={candidate.name}/>;
				})}
			</MoreIndicatorsColumn>
			: null}
	</MoreIndicatorsContainer>;
};