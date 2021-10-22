import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ReportDataSetEventBus} from './report-dataset-event-bus-types';

const Context = React.createContext<ReportDataSetEventBus>({} as ReportDataSetEventBus);
Context.displayName = 'ReportDataSetEventBus';

export const ReportDataSetEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ReportDataSetEventBus>({
		fire: (type: string, ...data: Array<any>): ReportDataSetEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ReportDataSetEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into report dataset event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ReportDataSetEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportDataSetEventBus = () => useContext(Context);
