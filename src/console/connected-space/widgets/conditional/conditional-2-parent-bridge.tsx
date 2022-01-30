import React, {Fragment, useEffect} from 'react';
import {useConditionalEventBus} from './conditional-event-bus';
import {ConditionalEventTypes} from './conditional-event-bus-types';

export const Conditional2ParentBridge = (props: {
	onChange: () => void;
}) => {
	const {onChange} = props;

	const {on, off} = useConditionalEventBus();
	useEffect(() => {
		on(ConditionalEventTypes.TOP_TYPE_CHANGED, onChange);
		on(ConditionalEventTypes.CONTENT_CHANGED, onChange);
		return () => {
			off(ConditionalEventTypes.TOP_TYPE_CHANGED, onChange);
			off(ConditionalEventTypes.CONTENT_CHANGED, onChange);
		};
	}, [on, off, onChange]);

	return <Fragment/>;
};