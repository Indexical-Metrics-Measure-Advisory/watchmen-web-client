import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {createContext, ReactNode, useContext} from 'react';
import {TopicEventBus, TopicEventTypes} from './topic-event-bus-types';

const Context = createContext<TopicEventBus>({} as TopicEventBus);
Context.displayName = 'TopicEventBus';

export const TopicEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const bus = useCreateEventBus<TopicEventBus>('topic', {
		beforeFire: (type: string) => {
			if (type !== TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED) {
				fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			}
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTopicEventBus = () => useContext(Context);
