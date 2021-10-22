import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ReportEditEventBus} from './report-edit-event-bus-types';

const Context = React.createContext<ReportEditEventBus>({} as ReportEditEventBus);
Context.displayName = 'ReportEditEventBus';

export const ReportEditEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ReportEditEventBus>({
		fire: (type: string, ...data: Array<any>): ReportEditEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ReportEditEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into report-edit event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ReportEditEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportEditEventBus = () => useContext(Context);
