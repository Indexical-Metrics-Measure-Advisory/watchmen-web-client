import {ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {Space, SpaceFilter} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {Toggle} from '@/widgets/basic/toggle';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
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

export const RestrictionsTable = (props: { space: Space }) => {
	const {space} = props;

	const {once: onceCache} = useAdminCacheEventBus();
	const {on, off} = useSpaceEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicChanged = () => {
			if (!space.filters) {
				space.filters = [];
			}
			(space.topicIds || []).forEach(topicId => {
				// eslint-disable-next-line
				const filter = space.filters?.find(filter => filter.topicId == topicId);
				if (!filter) {
					space.filters?.push({
						topicId,
						joint: {jointType: ParameterJointType.AND, filters: []},
						enabled: false
					});
				}
			});
			space.filters?.filter(filter => {
				// eslint-disable-next-line
				return (space.topicIds || []).every(topicId => topicId != filter.topicId);
			}).forEach(filter => filter.enabled = false);
			forceUpdate();
		};
		on(SpaceEventTypes.TOPIC_ADDED, onTopicChanged);
		on(SpaceEventTypes.TOPIC_REMOVED, onTopicChanged);
		return () => {
			off(SpaceEventTypes.TOPIC_ADDED, onTopicChanged);
			off(SpaceEventTypes.TOPIC_REMOVED, onTopicChanged);
		};
	}, [on, off, forceUpdate, space]);
	useEffect(() => {
		onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
			const {topics} = data || {};
			setTopics(topics || []);
		}).fire(AdminCacheEventTypes.ASK_DATA);
	}, [onceCache]);

	const onFilterEnabledChanged = (filter: SpaceFilter) => (value: boolean) => {
		filter.enabled = value;
		forceUpdate();
	};

	const filters = space.filters || [];

	return <RestrictionsTableContainer>
		<RestrictionsPropLabel>Restrictions:</RestrictionsPropLabel>
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
				</RestrictionRowContainer>;
			})}
		</RestrictionsTableBodyContainer>
	</RestrictionsTableContainer>;
};