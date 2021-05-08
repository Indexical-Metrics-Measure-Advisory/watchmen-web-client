import React from 'react';
import {TupleImage} from './widgets';

export const TupleBackgroundImage = (props: { tupleImage: string, tupleImagePosition?: string }) => {
	const {tupleImage, tupleImagePosition = 'left'} = props;

	return <TupleImage background={tupleImage} position={tupleImagePosition}/>;
};
