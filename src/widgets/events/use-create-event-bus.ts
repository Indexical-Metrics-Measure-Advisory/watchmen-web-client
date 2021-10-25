import EventEmitter from 'events';
import {useState} from 'react';

export const useCreateEventBus = <T extends any>(name: string, options?: {
	beforeFire?: (type: string, emitter: EventEmitter) => void;
	afterFire?: (type: string, emitter: EventEmitter) => void;
}) => {
	const {beforeFire, afterFire} = options ?? {};

	const [bus] = useState<T>(() => {
		const emitter = new EventEmitter().setMaxListeners(999999);
		return {
			fire: (type: string, ...data: Array<any>): T => {
				beforeFire && beforeFire(type, emitter);
				emitter.emit(type, ...data);
				afterFire && afterFire(type, emitter);
				return bus;
			},
			once: (type: string, listener: (...data: Array<any>) => void): T => {
				emitter.once(type, listener);
				return bus;
			},
			on: (type: string, listener: (...data: Array<any>) => void): T => {
				if (emitter.rawListeners(type).includes(listener)) {
					console.error(`Listener on [${type}] was added into ${name} bus, check it.`);
				}
				emitter.on(type, listener);
				return bus;
			},
			off: (type: string, listener: (...data: Array<any>) => void): T => {
				emitter.off(type, listener);
				return bus;
			}
		} as T;
	});

	return bus;
};