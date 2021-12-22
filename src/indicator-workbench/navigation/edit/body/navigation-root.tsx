import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useRef, useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {computeScore} from './indicator-calculation/utils';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorValues} from './types';
import {NavigationRootNode} from './widgets';

interface IndicatorValuesPair {
	indicator: NavigationIndicator;
	values: IndicatorValues;
	score?: number;
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
				const {useScore, score} = computeScore({
					script: pair.indicator.formula,
					current: pair.values.current,
					previous: pair.values.previous
				});
				if (useScore) {
					sum.visible = true;
					pair.score = Number((score ?? 0).toFixed(1));
					sum.sum = (sum.sum ?? 0) + pair.score;
				}

				return sum;
			}, {visible: false, sum: 0} as Pick<ScoreState, 'visible' | 'sum'>);
		};
		const calculate = () => {
			const {visible, sum} = doCalculate(scoreState.data);
			scoreState.visible = visible;
			scoreState.sum = sum;
			forceUpdate();
		};
		const onIndicatorRemoved = (aNavigation: Navigation, navigationIndicator: NavigationIndicator) => {
			defendNavigation(aNavigation, () => {
				const index = scoreState.data.findIndex(({indicator}) => indicator !== navigationIndicator);
				if (index !== -1) {
					scoreState.data.splice(index, 1);
				}
				calculate();
			});
		};
		const onValuesChanged = (aNavigation: Navigation, navigationIndicator: NavigationIndicator, values: IndicatorValues) => {
			defendNavigation(aNavigation, () => {
				const pair = scoreState.data.find(({indicator}) => indicator === navigationIndicator);
				if (pair == null) {
					scoreState.data.push({indicator: navigationIndicator, values});
				} else {
					pair.values = values;
					delete pair.score;
				}
				calculate();
			});
		};
		onEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		onEdit(NavigationEditEventTypes.VALUES_CHANGED, onValuesChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
			offEdit(NavigationEditEventTypes.VALUES_CHANGED, onValuesChanged);
		};
	}, [onEdit, offEdit, navigation, scoreState]);

	return <NavigationRootNode id={id} ref={ref}>
		<div>{navigation.name || Lang.INDICATOR_WORKBENCH.NAVIGATION.ROOT}</div>
		{scoreState.visible
			? <div>{Lang.INDICATOR_WORKBENCH.NAVIGATION.SCORE_SUM_LABEL} {scoreState.sum}</div>
			: null}
	</NavigationRootNode>;
};