import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {NavigationEditEventBus} from './navigation-edit-event-bus-types';

const Context = createContext<NavigationEditEventBus>({} as NavigationEditEventBus);
Context.displayName = 'NavigationEditEventBus';

export const NavigationEditEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<NavigationEditEventBus>('navigation edit');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useNavigationEditEventBus = () => useContext(Context);
