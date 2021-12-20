import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {IndicatorContent} from '../indicator-content';
import {useCurve} from '../use-curve';
import {computeCurvePath} from '../utils';
import {IndicatorCurve, IndicatorNode, IndicatorNodeContainer} from './widgets';

const InternalPickedIndicator = (props: {
	parentId: string;
	id: string;
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator?: Indicator;
}) => {
	const {parentId, id, navigation, navigationIndicator, indicator} = props;

	const {ref, curve} = useCurve(parentId);

	const index = navigation.indicators.indexOf(navigationIndicator) + 1;

	return <>
		<IndicatorNode id={id} error={indicator == null} ref={ref}>
			<span>{index}.</span>
			<span>{indicator == null ? Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR : (indicator.name || 'Noname Indicator')}</span>
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

	return <IndicatorNodeContainer>
		<InternalPickedIndicator parentId={parentId} id={id}
		                         navigation={navigation} navigationIndicator={navigationIndicator}
		                         indicator={indicator}/>
		{indicator == null
			? null
			: <IndicatorContent navigation={navigation} navigationIndicator={navigationIndicator}
			                    indicator={indicator}/>}
	</IndicatorNodeContainer>;
};