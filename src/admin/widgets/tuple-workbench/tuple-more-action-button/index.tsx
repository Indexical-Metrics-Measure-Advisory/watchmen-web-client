import React from 'react';
import {TupleMoreActionButton} from './widgets';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const TupleMoreButton = (props: {
	label: string;
	icon: IconProp
	action: () => void;
}) => {
	const {label, icon, action} = props;

	return <TupleMoreActionButton onClick={action}>
		<FontAwesomeIcon icon={icon}/>
		<span>{label}</span>
	</TupleMoreActionButton>;
};