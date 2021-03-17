import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { QueryEnumForHolder } from '../../../services/tuples/query-enum-types';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorRow } from '../factor/factor-row';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';
import { FactorsTableBodyContainer } from './widgets';

export const FactorsTableBody = (props: { topic: Topic, enums: Array<QueryEnumForHolder> }) => {
	const { topic, enums } = props;

	const { on, off } = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(TopicEventTypes.FACTOR_ADDED, forceUpdate);
		on(TopicEventTypes.FACTOR_REMOVED, forceUpdate);
		on(TopicEventTypes.FACTORS_IMPORTED, forceUpdate);
		return () => {
			off(TopicEventTypes.FACTOR_ADDED, forceUpdate);
			off(TopicEventTypes.FACTOR_REMOVED, forceUpdate);
			off(TopicEventTypes.FACTORS_IMPORTED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <FactorsTableBodyContainer>
		{topic.factors.map(factor => {
			return <FactorRow topic={topic} factor={factor} enums={enums}
			                  key={factor.factorId}/>;
		})}
	</FactorsTableBodyContainer>;
};