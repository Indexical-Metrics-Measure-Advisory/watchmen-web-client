import {fetchIndicator, loadIndicatorCategories, saveIndicator} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {QueryIndicatorCategoryParams} from '@/services/data/tuples/query-indicator-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {Fragment, useEffect, useState} from 'react';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from './indicators-event-bus-types';
import {createIndicator} from './utils';

interface IndicatorCategoryCache {
	c1: Record<string, Array<string>>;
	c2: Record<string, Array<string>>;
	c3: Record<string, Array<string>>;
}

const categorySort = (c1: string, c2: string) => {
	return c1.localeCompare(c2, void 0, {sensitivity: 'base', caseFirst: 'upper'});
};

const findInCache = (cache: IndicatorCategoryCache, key: Array<string>): Array<string> | undefined => {
	const store = key.length === 0 ? cache.c1 : (key.length === 1 ? cache.c2 : cache.c3);
	return store[key.join(',').toLowerCase()];
};

const putIntoCache = (cache: IndicatorCategoryCache, key: Array<string>, categories: Array<string>) => {
	const store = key.length === 0 ? cache.c1 : (key.length === 1 ? cache.c2 : cache.c3);
	store[key.join(',').toLowerCase()] = categories;
};

const putIfPresent = (cache: IndicatorCategoryCache, key: Array<string | undefined>, category: string = '') => {
	if (category == null || category.trim().length === 0) {
		return;
	}

	category = category.toLowerCase().trim();
	const store = key.length === 0 ? cache.c1 : (key.length === 1 ? cache.c2 : cache.c3);
	const cacheKey = key.map(k => k ?? '').map(k => k.trim().toLowerCase()).join(',');
	const existing = store[cacheKey];
	if (existing == null) {
		// do nothing, cache might not be loaded now, keep it for next loading
	} else if (!existing.includes(category)) {
		store[cacheKey] = [...new Set([...existing, category])].sort(categorySort);
	}
};

export const IndicatorState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useIndicatorsEventBus();
	const [, setData] = useState<IndicatorsData>({});
	const [categories] = useState<IndicatorCategoryCache>({c1: {}, c2: {}, c3: {}});
	useEffect(() => {
		const onCreateIndicator = (onCreated: (indicator: Indicator) => void) => {
			const indicator = createIndicator();
			setData({indicator});
			onCreated(indicator);
		};
		on(IndicatorsEventTypes.CREATE_INDICATOR, onCreateIndicator);
		return () => {
			off(IndicatorsEventTypes.CREATE_INDICATOR, onCreateIndicator);
		};
	}, [on, off]);
	useEffect(() => {
		const onPickIndicator = async (indicatorId: IndicatorId, onData: (data: IndicatorsData) => void) => {
			try {
				const data = await fetchIndicator(indicatorId);
				setData(data);
				onData(data);
			} catch {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.INDICATOR_WORKBENCH.INDICATOR.FAILED_TO_LOAD_INDICATOR}
				</AlertLabel>);
			}
		};
		on(IndicatorsEventTypes.PICK_INDICATOR, onPickIndicator);
		return () => {
			off(IndicatorsEventTypes.PICK_INDICATOR, onPickIndicator);
		};
	}, [on, off, fireGlobal]);
	useEffect(() => {
		const onPickTopic = async (data: IndicatorsData, onData: (data: IndicatorsData) => void) => {
			onData(data);
		};
		on(IndicatorsEventTypes.PICK_TOPIC, onPickTopic);
		return () => {
			off(IndicatorsEventTypes.PICK_TOPIC, onPickTopic);
		};
	}, [on, off]);
	useEffect(() => {
		const onSaveIndicator = (indicator: Indicator, onSaved: (indicator: Indicator, saved: boolean) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveIndicator(indicator),
				() => {
					const {category1, category2, category3} = indicator;
					putIfPresent(categories, [], category1);
					putIfPresent(categories, [category1], category2);
					putIfPresent(categories, [category1, category2], category3);
					fire(IndicatorsEventTypes.INDICATOR_SAVED, indicator);
					onSaved(indicator, true);
				},
				() => onSaved(indicator, false));
		};
		on(IndicatorsEventTypes.SAVE_INDICATOR, onSaveIndicator);
		return () => {
			off(IndicatorsEventTypes.SAVE_INDICATOR, onSaveIndicator);
		};
	}, [on, off, fire, fireGlobal, categories]);
	useEffect(() => {
		const onAskIndicatorCategory = (indicator: Indicator, prefix: QueryIndicatorCategoryParams, onData: (candidates: Array<string>) => void) => {
			const candidates = findInCache(categories, prefix);
			if (candidates != null) {
				onData(candidates);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await loadIndicatorCategories(prefix),
					(candidates: Array<string>) => {
						const sorted = candidates.sort(categorySort);
						onData(sorted);
						putIntoCache(categories, prefix, sorted);
					}, () => onData([]));
			}
		};

		on(IndicatorsEventTypes.ASK_INDICATOR_CATEGORY, onAskIndicatorCategory);
		return () => {
			off(IndicatorsEventTypes.ASK_INDICATOR_CATEGORY, onAskIndicatorCategory);
		};
	}, [on, off, fireGlobal, categories]);

	return <Fragment/>;
};