import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {ParameterEventBus} from './parameter-event-bus-types';

const Context = React.createContext<ParameterEventBus>({} as ParameterEventBus);
Context.displayName = 'ParameterEventBus';

export const ParameterEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ParameterEventBus>('parameter');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useParameterEventBus = () => useContext(Context);
