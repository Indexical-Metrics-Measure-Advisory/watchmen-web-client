import {FocusEvent} from 'react';
import styled from 'styled-components';

export const InputLines = styled.textarea.attrs<{ autoSelect?: boolean }>(({autoSelect = true, onFocus}) => {
	return {
		'data-v-scroll': '',
		'data-h-scroll': '',
		onFocus: autoSelect ? ((event: FocusEvent<HTMLTextAreaElement>) => {
			event.target.select();
			onFocus && onFocus(event);
		}) : onFocus
	};
})<{ autoSelect?: boolean }>`
	appearance       : none;
	outline          : none;
	padding          : 6px var(--input-indent);
	border           : var(--border);
	border-radius    : var(--border-radius);
	font-family      : var(--font-family);
	font-size        : 12px;
	height           : calc(var(--height) * 3);
	line-height      : var(--line-height);
	color            : var(--font-color);
	background-color : transparent;
	resize           : none;
	transition       : all 300ms ease-in-out;
`;