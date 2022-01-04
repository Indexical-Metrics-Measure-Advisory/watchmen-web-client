import {Navigation} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useRef, useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {AllCalculatedIndicatorValuesData, AllIndicatedValuesCalculationResult} from './types';
import {useIndicatorValuesAggregator} from './use-indicator-values-aggregator';
import {NavigationRootNode} from './widgets';

const computeScore = (data: AllCalculatedIndicatorValuesData): AllIndicatedValuesCalculationResult => {
	const score = data.reduce((sum, pair) => {
		const {
			indicator: {includeInFinalScore = true},
			values: {shouldComputeScore, score: {value: score = 0} = {}}
		} = pair;
		if (shouldComputeScore && includeInFinalScore) {
			sum = sum + Number(score.toFixed(1));
		}

		return sum;
	}, 0);
	return {
		failed: false,
		shouldComputeScore: true,
		score: {
			value: score,
			formatted: score.toFixed(1)
		}
	};
};

const alwaysAvoidFormulaChanged = () => true;

export const NavigationRoot = (props: { id: string; navigation: Navigation }) => {
	const {id, navigation} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useNavigationEventBus();
	const [avoidValuesEvent, setAvoidValuesEvent] = useState(() => {
		return (aNavigation: Navigation) => aNavigation !== navigation;
	});
	const forceUpdate = useForceUpdate();
	const {score: {formatted: score} = {}, shouldComputeScore} = useIndicatorValuesAggregator({
		navigation,
		shouldAvoidIndicatorRemovedAndValuesCalculated: avoidValuesEvent,
		shouldAvoidFormulaChanged: alwaysAvoidFormulaChanged,
		shouldAvoidScoreIncludeChanged: avoidValuesEvent,
		compute: computeScore,
		onComputed: forceUpdate
	});
	useEffect(() => {
		setAvoidValuesEvent(() => (aNavigation: Navigation) => aNavigation !== navigation);
	}, [navigation]);
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

	return <NavigationRootNode id={id} ref={ref}>
		<div>{navigation.name || Lang.INDICATOR_WORKBENCH.NAVIGATION.ROOT}</div>
		{shouldComputeScore
			? <div>{Lang.INDICATOR_WORKBENCH.NAVIGATION.SCORE_SUM_LABEL} {(score || 0)}</div>
			: null}
	</NavigationRootNode>;
};