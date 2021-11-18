import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {SubjectDefEventBus} from './subject-def-event-bus-types';

const Context = createContext<SubjectDefEventBus>({} as SubjectDefEventBus);
Context.displayName = 'SubjectDefEventBus';

export const SubjectDefEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SubjectDefEventBus>('subject definition');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSubjectDefEventBus = () => useContext(Context);
