import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ReportViewEventBus} from './report-view-event-bus-types';

const Context = React.createContext<ReportViewEventBus>({} as ReportViewEventBus);
Context.displayName = 'ReportViewEventBus';

export const ReportViewEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ReportViewEventBus>({
		fire: (type: string, ...data: Array<any>): ReportViewEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ReportViewEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into report event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ReportViewEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportViewEventBus = () => useContext(Context);
