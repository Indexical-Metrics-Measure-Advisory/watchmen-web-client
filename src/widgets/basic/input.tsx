import React, {FocusEvent, ForwardedRef, forwardRef} from 'react';
import styled from 'styled-components';
import {InputProps} from './types';

const AnInput = styled.input.attrs<{ autoSelect: boolean }>(({autoSelect, onFocus}) => {
	if (!autoSelect) {
		return {};
	}

	return {
		onFocus: (event: FocusEvent<HTMLInputElement>) => {
			event.target.select();
			onFocus && onFocus(event);
		}
	};
})<{ autoSelect: boolean }>`
	display          : block;
	position         : relative;
	height           : var(--height);
	padding-left     : var(--input-indent);
	color            : var(--font-color);
	background-color : transparent;
	border           : var(--border);
	border-radius    : var(--border-radius);
	outline          : none;
	font-family      : var(--font-family);
	font-size        : var(--font-size);
	white-space      : nowrap;
	overflow         : hidden;
	text-overflow    : ellipsis;
	transition       : all 300ms ease-in-out;
`;

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {autoSelect = true, ...rest} = props;
	return <AnInput {...rest} autoSelect={autoSelect} ref={ref}/>;
});