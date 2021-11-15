import {ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {Space, SpaceFilter} from '@/services/data/tuples/space-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {Toggle} from '@/widgets/basic/toggle';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect, useState} from 'react';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {RestrictionFilter} from '../filters';
import {useSpaceEventBus} from '../space-event-bus';
import {SpaceEventTypes} from '../space-event-bus-types';
import {
	RestrictionEnablementCell,
	RestrictionIndexLabel,
	RestrictionNameLabel,
	RestrictionRowContainer,
	RestrictionsPropLabel,
	RestrictionsTableBodyContainer,
	RestrictionsTableContainer
} from './widgets';

type TemporaryFilters = Record<string, SpaceFilter>;

const redressFilters = (space: Space, tempFilters: TemporaryFilters): Array<TopicId> => {
	if (!space.filters) {
		space.filters = [];
	}
	return (space.topicIds || []).map(topicId => {
		// eslint-disable-next-line
		const filter = space.filters?.find(filter => filter.topicId == topicId);
		if (!filter) {
			if (tempFilters[topicId]) {
				space.filters?.push(tempFilters[topicId]);
			} else {
				space.filters?.push({
					topicId,
					joint: {jointType: ParameterJointType.AND, filters: []},
					enabled: false
				});
			}
		}
		return topicId;
	});
};

export const RestrictionsTable = (props: { space: Space }) => {
	const {space} = props;

	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire: fireTuple} = useTupleEventBus();
	const {on, off} = useSpaceEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [tempFilters, setTempFilters] = useState<TemporaryFilters>({});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicChanged = () => {
			redressFilters(space, tempFilters).forEach(topicId => delete tempFilters[topicId]);
			const built = space.filters!.reduce((all, filter) => {
				// eslint-disable-next-line
				if ((space.topicIds || []).some(topicId => filter.topicId == topicId)) {
					all.filters.push(filter);
				} else {
					filter.enabled = false;
					tempFilters[filter.topicId] = filter;
				}
				return all;
			}, {filters: [] as Array<SpaceFilter>, temp: {...tempFilters}});
			space.filters = built.filters;
			setTempFilters(built.temp);
		};
		on(SpaceEventTypes.TOPIC_ADDED, onTopicChanged);
		on(SpaceEventTypes.TOPIC_REMOVED, onTopicChanged);
		return () => {
			off(SpaceEventTypes.TOPIC_ADDED, onTopicChanged);
			off(SpaceEventTypes.TOPIC_REMOVED, onTopicChanged);
		};
	}, [on, off, space, tempFilters]);
	useEffect(() => {
		fireCache(AdminCacheEventTypes.ASK_DATA, (data?: AdminCacheData) => {
			const {topics} = data || {};
			setTopics(topics || []);
		});
	}, [fireCache]);

	const onFilterEnabledChanged = (filter: SpaceFilter) => (value: boolean) => {
		filter.enabled = value;
		forceUpdate();
		fireTuple(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
	};

	redressFilters(space, tempFilters).forEach(topicId => delete tempFilters[topicId]);
	const filters = space.filters || [];

	return <RestrictionsTableContainer>
		<RestrictionsPropLabel>{filters.length !== 0 ? 'Restrictions:' : 'No Restriction Defined.'}</RestrictionsPropLabel>
		<RestrictionsTableBodyContainer>
			{filters.map((filter, index) => {
				// eslint-disable-next-line
				const topic = topics.find(topic => topic.topicId == filter.topicId);
				if (topic == null) {
					return null;
				}
				return <RestrictionRowContainer key={filter.topicId}>
					<RestrictionIndexLabel>#{index + 1}</RestrictionIndexLabel>
					<RestrictionNameLabel>{topic.name || 'Noname Topic'}</RestrictionNameLabel>
					<RestrictionEnablementCell>
						<Toggle value={filter.enabled} onChange={onFilterEnabledChanged(filter)}/>
					</RestrictionEnablementCell>
					{filter.enabled ? <RestrictionFilter filter={filter} topic={topic}/> : null}
				</RestrictionRowContainer>;
			})}
		</RestrictionsTableBodyContainer>
	</RestrictionsTableContainer>;
};