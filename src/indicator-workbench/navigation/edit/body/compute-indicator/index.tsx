import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {useCurve} from '../use-curve';
import {Expandable, useIndicatorPartExpandable} from '../use-indicator-part-expandable';
import {computeCurvePath} from '../utils';
import {ComputeIndicatorNameEditor} from './indicator-name-editor';
import {
	ComputeIndicatorCurve,
	ComputeIndicatorNameEditContentContainer,
	ComputeIndicatorNode,
	ComputeIndicatorNodeContainer,
	ComputeIndicatorNodeIndex,
	ComputeIndicatorNodeName,
	ComputeIndicatorNodeRemover
} from './widgets';

const InternalComputeIndicator = (props: {
	parentId: string;
	id: string;
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	expanded: boolean;
}) => {
	const {parentId, id, navigation, navigationIndicator, expanded} = props;

	const {on, off, fire} = useNavigationEditEventBus();
	const {ref, curve} = useCurve(parentId);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onNameChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEditEventTypes.INDICATOR_NAME_CHANGED, onNameChanged);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_NAME_CHANGED, onNameChanged);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator]);

	const onRemoveClicked = () => {
		const index = (navigation.indicators || []).indexOf(navigationIndicator);
		if (index !== -1) {
			(navigation.indicators || []).splice(index, 1);
			fire(NavigationEditEventTypes.INDICATOR_REMOVED, navigation, navigationIndicator);
		}
	};

	const index = navigation.indicators.indexOf(navigationIndicator) + 1;
	const name = (navigationIndicator.name || '').trim().length === 0 ?
		Lang.INDICATOR_WORKBENCH.NAVIGATION.COMPUTE_INDICATOR_NODE_LABEL
		: (navigationIndicator.name || '').trim();

	return <>
		<ComputeIndicatorNode id={id} expanded={expanded} ref={ref}>
			<ComputeIndicatorNodeIndex>{index}.</ComputeIndicatorNodeIndex>
			<ComputeIndicatorNodeName>
				{name}
			</ComputeIndicatorNodeName>
			<ComputeIndicatorNodeRemover>
				<span onClick={onRemoveClicked}><FontAwesomeIcon icon={ICON_DELETE}/></span>
			</ComputeIndicatorNodeRemover>
		</ComputeIndicatorNode>
		{curve == null
			? null
			: <ComputeIndicatorCurve rect={curve}>
				<g>
					<path d={computeCurvePath(curve)}/>
				</g>
			</ComputeIndicatorCurve>}
	</>;
};

export const ComputeIndicator = (props: {
	parentId: string;
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	id: string;
}) => {
	const {parentId, navigation, navigationIndicator, id} = props;

	const {fire} = useNavigationEditEventBus();
	const {containerRef, expanded} = useIndicatorPartExpandable({
		navigation,
		navigationIndicator,
		expandable: Expandable.NAME
	});

	const onMouseEnter = () => {
		fire(NavigationEditEventTypes.EXPAND_NAME, navigation, navigationIndicator);
	};
	const onClicked = () => {
		fire(NavigationEditEventTypes.EXPAND_NAME, navigation, navigationIndicator);
	};

	return <ComputeIndicatorNodeContainer onMouseEnter={onMouseEnter} onClick={onClicked}>
		<InternalComputeIndicator parentId={parentId} id={id}
		                          navigation={navigation} navigationIndicator={navigationIndicator}
		                          expanded={expanded}/>
		<ComputeIndicatorNameEditContentContainer expanded={expanded} ref={containerRef}>
			<ComputeIndicatorNameEditor navigation={navigation} navigationIndicator={navigationIndicator}/>
		</ComputeIndicatorNameEditContentContainer>
	</ComputeIndicatorNodeContainer>;
};