import React, {Fragment, useEffect} from 'react';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Lang} from '../langs';
import {AlertLabel} from './widgets';

export const NotImplement = () => {
	const {fire, on, off} = useEventBus();

	useEffect(() => {
		const show = (onHide?: () => void) => {
			fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ALERT.NOT_IMPLEMENT}</AlertLabel>, onHide);
		};
		on(EventTypes.SHOW_NOT_IMPLEMENT, show);

		return () => {
			off(EventTypes.SHOW_NOT_IMPLEMENT, show);
		};
	}, [on, off, fire]);

	return <Fragment/>;
};