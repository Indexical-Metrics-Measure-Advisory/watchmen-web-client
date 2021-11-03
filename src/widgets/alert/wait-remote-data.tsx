import React, {useEffect, useState} from 'react';
import {ReactContent} from '../basic/types';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {AlertContainer, WaitRemoteDataBody, WaitRemoveDataDialog} from './widgets';

interface WaitRemoteDataState {
	visible: boolean;
	request?: () => Promise<any>;
	content?: ReactContent;
	onData?: (data: any) => void;
}

export const WaitRemoteData = () => {
	const {on, off, fire} = useEventBus();
	const [waiter, setWaiter] = useState<WaitRemoteDataState>({visible: false});
	const [functions] = useState({
		show: (request: () => Promise<void>, content?: ReactContent, onData?: (data: any) => void) => {
			if (waiter.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setWaiter({visible: true, request, content, onData});
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
			waiter.onData && waiter.onData(data);
			functions.hide();
		})();
	}, [fire, functions, waiter]);

	return <AlertContainer visible={waiter.visible}>
		<WaitRemoveDataDialog visible={waiter.visible}>
			<WaitRemoteDataBody>
				{waiter.content}
			</WaitRemoteDataBody>
		</WaitRemoveDataDialog>
	</AlertContainer>;
};
