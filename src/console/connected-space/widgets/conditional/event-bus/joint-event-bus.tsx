import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {JointEventBus} from './joint-event-bus-types';

const Context = createContext<JointEventBus>({} as JointEventBus);
Context.displayName = 'JointEventBus';

export const JointEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<JointEventBus>('joint');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useJointEventBus = () => useContext(Context);
