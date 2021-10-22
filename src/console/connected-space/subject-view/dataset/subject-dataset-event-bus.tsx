import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {SubjectDataSetEventBus} from './subject-dataset-event-bus-types';

const Context = React.createContext<SubjectDataSetEventBus>({} as SubjectDataSetEventBus);
Context.displayName = 'SubjectDataSetEventBus';

export const SubjectDataSetEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SubjectDataSetEventBus>('subject dataset');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSubjectDataSetEventBus = () => useContext(Context);
