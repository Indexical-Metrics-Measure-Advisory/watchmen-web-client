import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Expandable, useIndicatorPartExpandable} from '../use-indicator-part-expandable';
import {ComputeIndicatorCalculationFormula} from './formula';
import {LineToParent} from './line-to-parent';
import {ComputeIndicatorCalculationNodeContent} from './node-content';
import {OtherIndicatorValuesCalculator} from './other-indicator-values-calulator';
import {ComputeIndicatorCalculationNodeContainer} from './widgets';

export const ComputeIndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	id: string;
}) => {
	const {navigation, navigationIndicator, id} = props;

	const {containerRef, expanded} = useIndicatorPartExpandable({
		navigation,
		navigationIndicator,
		expandable: Expandable.CALCULATION
	});

	return <>
		<LineToParent navigation={navigation} navigationIndicator={navigationIndicator}/>
		<ComputeIndicatorCalculationNodeContainer ref={containerRef}>
			<ComputeIndicatorCalculationNodeContent id={id} navigation={navigation}
			                                        navigationIndicator={navigationIndicator}
			                                        expanded={expanded}/>
			<ComputeIndicatorCalculationFormula navigation={navigation} navigationIndicator={navigationIndicator}
			                                    expanded={expanded}/>
		</ComputeIndicatorCalculationNodeContainer>
		<OtherIndicatorValuesCalculator navigation={navigation} navigationIndicator={navigationIndicator}/>
	</>;
};