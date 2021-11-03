import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {SearchTextEventBus} from './search-text-event-bus-types';

const Context = React.createContext<SearchTextEventBus>({} as SearchTextEventBus);
Context.displayName = 'SearchTextEventBus';

export const SearchTextEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SearchTextEventBus>('tuple');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSearchTextEventBus = () => useContext(Context);
