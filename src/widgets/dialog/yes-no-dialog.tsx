import React, {Fragment, useEffect} from 'react';
import {Button} from '../basic/button';
import {ButtonInk} from '../basic/types';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Lang} from '../langs';
import {DialogBody, DialogFooter, DialogLabel} from './widgets';

const YesNoContent = (props: {
	question: string;
	onYes: () => void;
	onNo: () => void
}) => {
	const {question, onYes, onNo} = props;

	return <>
		<DialogBody>
			<DialogLabel>{question}</DialogLabel>
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onYes}>{Lang.DIALOG.BUTTON_YES}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onNo}>{Lang.DIALOG.BUTTON_NO}</Button>
		</DialogFooter>
	</>;
};

export const YesNoDialog = () => {
	const {fire, on, off} = useEventBus();

	useEffect(() => {
		const show = (question: string, onYes: () => void, onNo: () => void) => {
			fire(EventTypes.SHOW_DIALOG, <YesNoContent question={question} onYes={onYes} onNo={onNo}/>);
		};
		on(EventTypes.SHOW_YES_NO_DIALOG, show);

		return () => {
			off(EventTypes.SHOW_YES_NO_DIALOG, show);
		};
	}, [on, off, fire]);

	return <Fragment/>;
};