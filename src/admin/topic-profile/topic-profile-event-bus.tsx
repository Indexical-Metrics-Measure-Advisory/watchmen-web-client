import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {TopicProfileEventBus} from './topic-profile-event-bus-types';

const Context = createContext<TopicProfileEventBus>({} as TopicProfileEventBus);
Context.displayName = 'TopicProfileEventBus';

export const TopicProfileEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TopicProfileEventBus>('topic profile');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTopicProfileEventBus = () => useContext(Context);
