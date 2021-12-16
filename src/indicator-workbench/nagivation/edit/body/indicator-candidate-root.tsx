import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {ICON_USE_INDICATOR} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {createNavigationIndicator} from '../../utils';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {useCurve} from './use-curve';
import {computeCurvePath} from './utils';
import {IndicatorCandidateRootNode, IndicatorCurve, IndicatorRootNodeContainer, UseIndicatorCandidate} from './widgets';

export const IndicatorCandidateRoot = (props: {
	paletteId: string;
	parentId: string;
	navigation: Navigation;
	indicator: Indicator
}) => {
	const {parentId, navigation, indicator} = props;

	const {fire} = useNavigationEditEventBus();
	const {ref, curve} = useCurve(parentId);

	const onUseClicked = () => {
		const navigationIndicator = createNavigationIndicator(navigation, indicator);
		fire(NavigationEditEventTypes.INDICATOR_ADDED, navigation, navigationIndicator, indicator);
	};

	return <IndicatorRootNodeContainer>
		<IndicatorCandidateRootNode ref={ref}>
			<span>{indicator.name || 'Noname Indicator'}</span>
			<UseIndicatorCandidate onClick={onUseClicked}>
				<FontAwesomeIcon icon={ICON_USE_INDICATOR}/>
			</UseIndicatorCandidate>
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