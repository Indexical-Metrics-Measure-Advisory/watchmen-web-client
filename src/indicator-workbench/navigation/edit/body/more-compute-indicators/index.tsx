import {Navigation} from '@/services/data/tuples/navigation-types';
import {ICON_EXPAND_NODES} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {createNavigationManualComputeIndicator} from '../../../utils';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useCurve} from '../use-curve';
import {useShowAddIndicator} from '../use-show-add-indicator';
import {computeCurvePath} from '../utils';
import {
	MoreIndicatorsColumn,
	MoreIndicatorsContainer,
	MoreIndicatorsCurve,
	MoreIndicatorsNode,
	MoreIndicatorsNodeContainer
} from './widgets';

export const MoreComputeIndicators = (props: {
	paletteId: string;
	parentId: string;
	navigation: Navigation;
}) => {
	const {parentId, navigation} = props;

	const {fire} = useNavigationEditEventBus();
	const {ref, curve} = useCurve(parentId);
	const [id] = useState(v4());
	const visible = useShowAddIndicator(navigation);
	useEffect(() => {
		fire(NavigationEditEventTypes.REPAINT);
	}, [fire]);

	if (!visible) {
		return null;
	}

	const onMoreClicked = () => {
		const navigationIndicator = createNavigationManualComputeIndicator(navigation);
		fire(NavigationEditEventTypes.COMPUTE_INDICATOR_ADDED, navigation, navigationIndicator);
	};

	return <MoreIndicatorsContainer>
		<MoreIndicatorsColumn>
			<MoreIndicatorsNodeContainer>
				<MoreIndicatorsNode id={id} onClick={onMoreClicked} ref={ref}>
					<FontAwesomeIcon icon={ICON_EXPAND_NODES}/>
					{Lang.INDICATOR_WORKBENCH.NAVIGATION.ADD_COMPUTE_INDICATOR}
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
	</MoreIndicatorsContainer>;
};