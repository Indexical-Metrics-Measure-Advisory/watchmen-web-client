import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {ICON_CHECK, ICON_UNCHECK} from './constants';

const CheckBoxContainer = styled.div.attrs<{ 'data-widget'?: string }>(({'data-widget': widget}) => {
	return {
		'data-widget': widget || 'checkbox'
	};
})<{ 'data-widget'?: string }>`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	height          : var(--checkbox-size);
	width           : var(--checkbox-size);
	border          : var(--border);
	border-radius   : calc(var(--border-radius) * 2);
	cursor          : pointer;
	&[data-disabled=true] {
		cursor : default;
	}
	> svg {
		font-size : 0.8em;
	}
`;

export const CheckBox = (props: {
	value: boolean;
	onChange: (value: boolean) => void;
}) => {
	const {value, onChange, ...rest} = props;

	const onClicked = () => onChange(!value);

	return <CheckBoxContainer {...rest} onClick={onClicked}>
		{value
			? <FontAwesomeIcon icon={ICON_CHECK}/>
			: <FontAwesomeIcon icon={ICON_UNCHECK}/>}
	</CheckBoxContainer>;
};