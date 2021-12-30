import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {isManualComputeNavigationIndicator} from '@/services/data/tuples/navigation-utils';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ComputeIndicator} from '../compute-indicator';
import {IndicatorContent} from '../indicator-content';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useCurve} from '../use-curve';
import {computeCurvePath} from '../utils';
import {
	IndicatorCurve,
	IndicatorNode,
	IndicatorNodeContainer,
	IndicatorNodeIndex,
	IndicatorNodeName,
	IndicatorNodeRemover
} from './widgets';

const InternalPickedIndicator = (props: {
	parentId: string;
	id: string;
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator?: Indicator;
}) => {
	const {parentId, id, navigation, navigationIndicator, indicator} = props;

	const {fire} = useNavigationEditEventBus();
	const {ref, curve} = useCurve(parentId);

	const onRemoveClicked = () => {
		const index = (navigation.indicators || []).indexOf(navigationIndicator);
		if (index !== -1) {
			(navigation.indicators || []).splice(index, 1);
			fire(NavigationEditEventTypes.INDICATOR_REMOVED, navigation, navigationIndicator);
		}
	};

	const index = navigation.indicators.indexOf(navigationIndicator) + 1;

	return <>
		<IndicatorNode id={id} error={indicator == null} ref={ref}>
			<IndicatorNodeIndex>{index}.</IndicatorNodeIndex>
			<IndicatorNodeName>
				{indicator == null
					? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR
					: (indicator.name || 'Noname Indicator')}
			</IndicatorNodeName>
			<IndicatorNodeRemover>
				<span onClick={onRemoveClicked}><FontAwesomeIcon icon={ICON_DELETE}/></span>
			</IndicatorNodeRemover>
		</IndicatorNode>
		{curve == null
			? null
			: <IndicatorCurve rect={curve}>
				<g>
					<path d={computeCurvePath(curve)}/>
				</g>
			</IndicatorCurve>}
	</>;
};

export const PickedIndicator = (props: {
	paletteId: string;
	parentId: string;
	navigation: Navigation;
	id: string;
	navigationIndicator: NavigationIndicator;
	indicator?: Indicator;
}) => {
	const {parentId, navigation, id, navigationIndicator, indicator} = props;

	const isManualCompute = isManualComputeNavigationIndicator(navigationIndicator);

	if (isManualCompute) {
		return <ComputeIndicator parentId={parentId} id={id}
		                         navigation={navigation} navigationIndicator={navigationIndicator}/>;
	} else {
		return <IndicatorNodeContainer>
			<InternalPickedIndicator parentId={parentId} id={id}
			                         navigation={navigation} navigationIndicator={navigationIndicator}
			                         indicator={indicator}/>
			{indicator == null
				? null
				: <IndicatorContent id={id} navigation={navigation} navigationIndicator={navigationIndicator}
				                    indicator={indicator}/>}
		</IndicatorNodeContainer>;
	}
};