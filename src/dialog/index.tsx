import React, {CSSProperties, useEffect, useState} from 'react';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {DialogContainer, DialogWrapper} from './widgets';

interface DialogState {
	visible: boolean;
	content?: ((props: any) => React.ReactNode) | React.ReactNode;
	wrapperStyle?: CSSProperties
}

export const Dialog = () => {
	const {on, off} = useEventBus();
	const [dialog, setDialog] = useState<DialogState>({visible: false});
	const [functions] = useState({
		show: (content?: ((props: any) => React.ReactNode) | React.ReactNode, wrapperStyle?: CSSProperties) => {
			if (dialog.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setDialog({visible: true, content, wrapperStyle});
		},
		hide: () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			setDialog({visible: false, content: dialog.content});
		}
	});
	useEffect(() => {
		on(EventTypes.SHOW_DIALOG, functions.show);
		on(EventTypes.HIDE_DIALOG, functions.hide);
		return () => {
			off(EventTypes.SHOW_DIALOG, functions.show);
			off(EventTypes.HIDE_DIALOG, functions.hide);
		};
	}, [on, off, functions.show, functions.hide]);

	return <DialogContainer visible={dialog.visible}>
		<DialogWrapper style={dialog.wrapperStyle}>
			{dialog.content}
		</DialogWrapper>
	</DialogContainer>;
};