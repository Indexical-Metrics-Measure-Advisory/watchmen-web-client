import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {IndicatorsEventBus} from './indicators-event-bus-types';

const Context = createContext<IndicatorsEventBus>({} as IndicatorsEventBus);
Context.displayName = 'IndicatorsEventBus';

export const IndicatorsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<IndicatorsEventBus>('indicators');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useIndicatorsEventBus = () => useContext(Context);
