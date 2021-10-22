import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {CliEventBus} from './cli-event-bus-types';

const Context = React.createContext<CliEventBus>({} as CliEventBus);
Context.displayName = 'CliEventBus';

export const CliEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<CliEventBus>('cli');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useCliEventBus = () => useContext(Context);
