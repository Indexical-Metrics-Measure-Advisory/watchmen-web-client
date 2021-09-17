import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const MessageInputContainer = styled.div.attrs({'data-widget': 'alarm-message'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	align-items           : center;
	justify-self          : start;
`;
export const MessageInputLabel = styled.div.attrs({'data-widget': 'alarm-message-label'})`
	opacity       : 0;
	min-width     : 400px;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const MessageInput = styled(Input)`
	position         : absolute;
	width            : 100%;
	align-self       : center;
	height           : var(--param-height);
	background-color : var(--bg-color);
	padding          : 0 calc(var(--margin) / 2);
	border           : 0;
	border-radius    : calc(var(--param-height) / 2);
	box-shadow       : var(--param-border);
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;