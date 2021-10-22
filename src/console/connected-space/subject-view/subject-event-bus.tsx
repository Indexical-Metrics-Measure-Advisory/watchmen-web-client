import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {SubjectEventBus} from './subject-event-bus-types';

const Context = React.createContext<SubjectEventBus>({} as SubjectEventBus);
Context.displayName = 'SubjectEventBus';

export const SubjectEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SubjectEventBus>('subject');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSubjectEventBus = () => useContext(Context);
