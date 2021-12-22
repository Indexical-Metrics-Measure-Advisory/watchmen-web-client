import {useEffect, useState} from 'react';

export interface Queue {
	timeoutHandle?: number;
	save?: (time: FireTiming) => void;
}

export enum FireTiming {
	TIMEOUT = 'timeout',
	UNMOUNT = 'unmount',
	FORCE = 'force'
}

export interface QueueFunctions {
	/** replace existing function in queue */
	replace: (save: (time: FireTiming) => void, timeout: number) => void;
	/** clear queue, execute it when given parameter is true and queued function existed */
	clear: (execute: boolean) => void;
}

/**
 * never changed once constructed.
 */
export const useThrottler = () => {
	// queue will never be changed
	const [queue] = useState<Queue>({});
	const [functions] = useState<QueueFunctions>(() => {
		return {
			replace: (save: (time: FireTiming) => void, timeout: number) => {
				if (queue.timeoutHandle) {
					clearTimeout(queue.timeoutHandle);
				}
				queue.save = save;
				queue.timeoutHandle = window.setTimeout(() => {
					delete queue.timeoutHandle;
					delete queue.save;
					save(FireTiming.TIMEOUT);
				}, timeout);
			},
			clear: (execute: boolean) => {
				if (queue.timeoutHandle) {
					clearTimeout(queue.timeoutHandle);
				}
				if (execute && queue.save) {
					queue.save(FireTiming.FORCE);
				}
				delete queue.timeoutHandle;
				delete queue.save;
			}
		};
	});
	useEffect(() => {
		return () => {
			if (queue.timeoutHandle) {
				window.clearTimeout(queue.timeoutHandle);
			}
			if (queue.save) {
				queue.save(FireTiming.UNMOUNT);
			}
		};
		// execute only once on unmount since queue is fixed in whole lifecycle
	}, [queue]);

	return functions;
};