import {PropOf} from '@/services/types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_ADD} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {IndicatorCategory} from './indicator-category';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {CategoryNodes} from './types';
import {MoreIndicatorsColumn, MoreIndicatorsContainer, MoreIndicatorsNode} from './widgets';

export const MoreIndicators = (props: { rootId: string; candidates: PropOf<CategoryNodes, 'candidates'> }) => {
	const {rootId, candidates} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useNavigationEditEventBus();
	const [expanded, setExpanded] = useState(false);

	const onMoreClicked = () => {
		if (candidates.length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.NAVIGATION.NO_INDICATOR_CANDIDATE}
			</AlertLabel>);
			return;
		}

		setExpanded(!expanded);
		if (!expanded) {
			fire(NavigationEditEventTypes.EXPAND_MORE_INDICATORS);
		} else {
			fire(NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS);
		}
	};

	return <MoreIndicatorsContainer>
		<MoreIndicatorsColumn>
			<MoreIndicatorsNode onClick={onMoreClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
			</MoreIndicatorsNode>
		</MoreIndicatorsColumn>
		<MoreIndicatorsColumn>
			{candidates.map(candidate => {
				return <IndicatorCategory category={candidate} key={candidate.name}/>;
			})}
		</MoreIndicatorsColumn>
	</MoreIndicatorsContainer>;
};