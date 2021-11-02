import React, {useEffect, useState} from 'react';
import {Button} from '../basic/button';
import {ButtonInk, ReactContent} from '../basic/types';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Lang} from '../langs';
import {AlertBody, AlertContainer, AlertDialog, AlertFooter} from './widgets';

interface AlertState {
	visible: boolean;
	content?: ReactContent;
	onHide?: () => void;
}

export const Alert = () => {
	const {on, off} = useEventBus();
	const [alert, setAlert] = useState<AlertState>({visible: false});
	const [functions] = useState({
		show: (content?: ReactContent, onHide?: () => void) => {
			if (alert.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setAlert({visible: true, content, onHide});
		},
		hide: () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			const onHide = alert.onHide;
			setAlert({visible: false, content: alert.content});
			onHide && onHide();
		}
	});
	useEffect(() => {
		on(EventTypes.SHOW_ALERT, functions.show);
		on(EventTypes.HIDE_ALERT, functions.hide);
		return () => {
			off(EventTypes.SHOW_ALERT, functions.show);
			off(EventTypes.HIDE_ALERT, functions.hide);
		};
	}, [on, off, functions.show, functions.hide]);

	return <AlertContainer visible={alert.visible}>
		<AlertDialog visible={alert.visible}>
			<AlertBody>
				{alert.content}
			</AlertBody>
			<AlertFooter>
				<Button ink={ButtonInk.PRIMARY} onClick={functions.hide}>{Lang.ALERT.BUTTON}</Button>
			</AlertFooter>
		</AlertDialog>
	</AlertContainer>;
};
