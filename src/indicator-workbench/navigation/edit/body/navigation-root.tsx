import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useRef, useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {CalculatedIndicatorValues} from './types';
import {NavigationRootNode} from './widgets';

interface IndicatorValuesPair {
	indicator: NavigationIndicator;
	values: CalculatedIndicatorValues;
}

interface ScoreState {
	visible: boolean;
	data: Array<IndicatorValuesPair>;
	sum?: number;
}

export const NavigationRoot = (props: { id: string; navigation: Navigation }) => {
	const {id, navigation} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useNavigationEventBus();
	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const [scoreState] = useState<ScoreState>({visible: false, data: []});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onNameChanged = (aNavigation: Navigation) => {
			if (aNavigation !== navigation) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEventTypes.NAME_CHANGED, onNameChanged);
		return () => {
			off(NavigationEventTypes.NAME_CHANGED, onNameChanged);
		};
	}, [on, off, forceUpdate, navigation]);
	useEffect(() => {
		const defendNavigation = (aNavigation: Navigation, func: () => void) => {
			aNavigation === navigation && func();
		};
		const doCalculate = (pairs: Array<IndicatorValuesPair>): Pick<ScoreState, 'visible' | 'sum'> => {
			return pairs.reduce((sum, pair) => {
				const {values: {shouldComputeScore, score: {value: score = 0} = {}}} = pair;
				if (shouldComputeScore) {
					sum.visible = true;
					sum.sum = (sum.sum ?? 0) + Number(score.toFixed(1));
				}

				return sum;
			}, {visible: false, sum: 0} as Pick<ScoreState, 'visible' | 'sum'>);
		};
		const calculate = (data: Array<IndicatorValuesPair>) => {
			const {visible, sum} = doCalculate(data);
			scoreState.visible = visible;
			scoreState.sum = sum;
			forceUpdate();
		};
		const onIndicatorRemoved = (aNavigation: Navigation, navigationIndicator: NavigationIndicator) => {
			defendNavigation(aNavigation, () => {
				const index = scoreState.data.findIndex(({indicator}) => indicator === navigationIndicator);
				if (index !== -1) {
					scoreState.data.splice(index, 1);
				}
				calculate(scoreState.data);
			});
		};
		const onValuesCalculated = (aNavigation: Navigation, navigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues) => {
			defendNavigation(aNavigation, () => {
				const pair = scoreState.data.find(({indicator}) => indicator === navigationIndicator);
				if (pair == null) {
					scoreState.data.push({indicator: navigationIndicator, values});
				} else {
					pair.values = values;
				}
				calculate(scoreState.data);
			});
		};
		onEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		onEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
			offEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		};
	}, [onEdit, offEdit, forceUpdate, navigation, scoreState]);

	return <NavigationRootNode id={id} ref={ref}>
		<div>{navigation.name || Lang.INDICATOR_WORKBENCH.NAVIGATION.ROOT}</div>
		{scoreState.visible
			? <div>{Lang.INDICATOR_WORKBENCH.NAVIGATION.SCORE_SUM_LABEL} {(scoreState.sum ?? 0).toFixed(1)}</div>
			: null}
	</NavigationRootNode>;
};