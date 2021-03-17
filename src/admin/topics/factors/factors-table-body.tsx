import React, { useEffect, useState } from 'react';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Factor } from '../../../services/tuples/factor-types';
import { QueryEnumForHolder } from '../../../services/tuples/query-enum-types';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorRow } from '../factor/factor-row';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';
import { FactorsTableBodyContainer } from './widgets';

const filterBy = (factors: Array<Factor>, text: string, getValue: (factor: Factor) => string): Array<Factor> => {
	if (text.length === 0) {
		return factors;
	}

	return factors.filter(factor => {
		const value = getValue(factor);
		if (value == null || value.trim().length === 0) {
			return false;
		} else {
			return value.toLowerCase().includes(text);
		}
	});
};
const filterFactors = (topic: Topic, search: string): Array<Factor> => {
	let factors: Array<Factor> = topic.factors || [];
	const text = (search || '').trim();
	switch (true) {
		case (text.length === 0):
			// do nothing
			break;
		case text.startsWith('n:') :
			// in name
			factors = filterBy(factors, text.substr(2).trim().toLowerCase(), (factor: Factor) => factor.name);
			break;
		case text.startsWith('l:') :
			// in label
			factors = filterBy(factors, text.substr(2).trim().toLowerCase(), (factor: Factor) => factor.label);
			break;
		case text.startsWith('t:'):
			// in type
			factors = filterBy(factors, text.substr(2).trim().toLowerCase(), (factor: Factor) => factor.type);
			break;
		case text.startsWith('i:'):
			// in index
			factors = filterBy(factors, `i-${text.substr(2).trim().toLowerCase()}`, (factor: Factor) => factor.indexGroup || '');
			break;
		case text.startsWith('u:'):
			// in unique index
			factors = filterBy(factors, `u-${text.substr(2).trim().toLowerCase()}`, (factor: Factor) => factor.indexGroup || '');
			break;
		case text.startsWith('v:'):
			// in default value
			const has = text.substr(2).trim().toLowerCase() === 'true';
			factors = factors.filter(factor => {
				if (has) {
					return factor.defaultValue != null && factor.defaultValue.length !== 0;
				} else {
					return factor.defaultValue == null || factor.defaultValue.length === 0;
				}
			});
			break;
		default:
			factors = filterBy(factors, text.trim().toLowerCase(), (factor: Factor) => `${factor.name}\t${factor.label}`);
			break;
	}

	return factors;
};

export const FactorsTableBody = (props: { topic: Topic, enums: Array<QueryEnumForHolder> }) => {
	const { topic, enums } = props;

	const { on, off } = useTopicEventBus();
	const [ searchText, setSearchText ] = useState('');
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSearchTextChanged = (changedTopic: Topic, searchText: string) => {
			if (changedTopic !== topic) {
				return;
			}
			setSearchText(searchText);
		};
		on(TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, onSearchTextChanged);

		on(TopicEventTypes.FACTOR_ADDED, forceUpdate);
		on(TopicEventTypes.FACTOR_REMOVED, forceUpdate);
		on(TopicEventTypes.FACTORS_IMPORTED, forceUpdate);
		return () => {
			off(TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, onSearchTextChanged);

			off(TopicEventTypes.FACTOR_ADDED, forceUpdate);
			off(TopicEventTypes.FACTOR_REMOVED, forceUpdate);
			off(TopicEventTypes.FACTORS_IMPORTED, forceUpdate);
		};
	}, [ on, off, forceUpdate, topic ]);

	return <FactorsTableBodyContainer>
		{filterFactors(topic, searchText).map(factor => {
			return <FactorRow topic={topic} factor={factor} enums={enums}
			                  key={factor.factorId}/>;
		})}
	</FactorsTableBodyContainer>;
};