import React, { useEffect, useState } from 'react';
import { useTupleEventBus } from '../tuple-event-bus';
import { TupleEventTypes } from '../tuple-event-bus-types';
import { TupleImage } from './widgets';

export const TupleBackgroundImage = (props: { tupleImage: string }) => {
	const { tupleImage } = props;

	const { on, off } = useTupleEventBus();
	const [ position, setPosition ] = useState('left');
	useEffect(() => {
		on(TupleEventTypes.CHANGE_TUPLE_IMAGE_POSITION, setPosition);
		return () => {
			off(TupleEventTypes.CHANGE_TUPLE_IMAGE_POSITION, setPosition);
		};
	}, [ on, off ]);

	return <TupleImage background={tupleImage} position={position}/>;
};
