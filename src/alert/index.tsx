import React, { useEffect, useState } from 'react';
import { Button } from '../basic-widgets/button';
import { ButtonInk } from '../basic-widgets/types';
import { useEventBus } from '../events/event-bus';
import { EventTypes } from '../events/types';
import { Lang } from '../langs';
import { AlertBody, AlertContainer, AlertDialog, AlertFooter } from './widgets';

interface AlertState {
	visible: boolean;
	content?: ((props: any) => React.ReactNode) | React.ReactNode
}

export const Alert = () => {
	const { on, off, fire } = useEventBus();
	const [ alert, setAlert ] = useState<AlertState>({ visible: false });
	const [ functions ] = useState({
		show: (content?: ((props: any) => React.ReactNode) | React.ReactNode) => {
			if (alert.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setAlert({ visible: true, content });
		},
		hide: () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			setAlert({ visible: false, content: alert.content });
			fire(EventTypes.ALERT_HIDDEN);
		}
	});
	useEffect(() => {
		on(EventTypes.SHOW_ALERT, functions.show);
		on(EventTypes.HIDE_ALERT, functions.hide);
		return () => {
			off(EventTypes.SHOW_ALERT, functions.show);
			off(EventTypes.HIDE_ALERT, functions.hide);
		};
	}, [ on, off, functions.show, functions.hide ]);

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
