import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Input } from './input';

const Container = styled.div.attrs({ 'data-widget': 'page-title-editor' })`
	display     : flex;
	position    : relative;
	margin-left : var(--input-indent);
	transition  : all 300ms ease-in-out;
	&:hover,
	&:focus-within {
		> input[data-widget="page-title-editor-input"] {
			opacity        : 1;
			pointer-events : auto;
		}
	}
	&:focus-within {
		flex-grow : 1;
	}
`;
const Label = styled.div.attrs({ 'data-widget': 'page-title-editor-label' })`
	padding       : 0 var(--input-indent);
	font-family   : var(--title-font-family);
	font-size     : 3em;
	height        : 1.3em;
	line-height   : 1.3em;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow      : hidden;
`;
const Editor = styled(Input).attrs({ 'data-widget': 'page-title-editor-input' })`
	position       : absolute;
	padding-right  : var(--input-indent);
	font-family    : var(--title-font-family);
	font-size      : 3em;
	top            : -1px;
	width          : 100%;
	height         : 1.3em;
	line-height    : 1.3em;
	border         : 0;
	opacity        : 0;
	pointer-events : none;
	white-space    : nowrap;
	text-overflow  : ellipsis;
	overflow       : hidden;
	box-shadow     : var(--hover-shadow);
	z-index        : 1;
	&:focus {
		box-shadow : var(--primary-hover-shadow);
	}
`;

export const PageTitleEditor = (props: {
	title: string;
	onChange: (newTitle: string) => void;
}) => {
	const { title, onChange } = props;

	const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return <Container>
		<Label>{title}</Label>
		<Editor value={title} onChange={onTextChange}/>
	</Container>;
};