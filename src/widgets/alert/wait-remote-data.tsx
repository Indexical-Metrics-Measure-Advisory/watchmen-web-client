import React, {useEffect, useState} from 'react';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {AlertContainer, WaitRemoteDataBody, WaitRemoveDataDialog} from './widgets';

interface WaitRemoteDataState {
	visible: boolean;
	request?: () => Promise<any>;
	content?: ((props: any) => React.ReactNode) | React.ReactNode;
}

export const WaitRemoteData = () => {
	const {on, off, fire} = useEventBus();
	const [waiter, setWaiter] = useState<WaitRemoteDataState>({visible: false});
	const [functions] = useState({
		show: (request: () => Promise<void>, content?: ((props: any) => React.ReactNode) | React.ReactNode) => {
			if (waiter.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setWaiter({visible: true, request, content});
		},
		hide: () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			setWaiter({visible: false, content: waiter.content});
		}
	});
	useEffect(() => {
		on(EventTypes.SHOW_WAITING, functions.show);
		return () => {
			off(EventTypes.SHOW_WAITING, functions.show);
		};
	}, [on, off, functions.show, functions.hide]);
	useEffect(() => {
		if (!waiter.request) {
			return;
		}
		(async () => {
			const data = await waiter.request!();
			fire(EventTypes.REPLY_WAITING_DATA, data);
			functions.hide();
		})();
	}, [fire, functions, waiter.request]);

	return <AlertContainer visible={waiter.visible}>
		<WaitRemoveDataDialog visible={waiter.visible}>
			<WaitRemoteDataBody>
				{waiter.content}
			</WaitRemoteDataBody>
		</WaitRemoveDataDialog>
	</AlertContainer>;
};
