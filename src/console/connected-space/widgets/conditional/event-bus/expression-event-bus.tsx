import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ExpressionEventBus} from './expression-event-bus-types';

const Context = createContext<ExpressionEventBus>({} as ExpressionEventBus);
Context.displayName = 'ExpressionEventBus';

export const ExpressionEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ExpressionEventBus>('expression');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useExpressionEventBus = () => useContext(Context);
