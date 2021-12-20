import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {NavigationEventBus} from './navigation-event-bus-types';

const Context = createContext<NavigationEventBus>({} as NavigationEventBus);
Context.displayName = 'NavigationEventBus';

export const NavigationEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<NavigationEventBus>('navigation');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useNavigationEventBus = () => useContext(Context);
