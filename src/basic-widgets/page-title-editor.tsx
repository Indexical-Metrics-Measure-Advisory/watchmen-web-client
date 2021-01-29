import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Input } from './input';

const Container = styled.div.attrs({ 'data-widget': 'page-title-editor' })`
	display     : flex;
	position    : relative;
	margin-left : var(--input-indent);
	transition  : all 300ms ease-in-out;
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
	visibility    : hidden;
`;
const Editor = styled(Input).attrs({ 'data-widget': 'page-title-editor-input' })`
	position      : absolute;
	padding-right : var(--input-indent);
	font-family   : var(--title-font-family);
	font-size     : 3em;
	width         : 100%;
	height        : 1.3em;
	line-height   : 1.3em;
	border        : 0;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow      : hidden;
	z-index       : 1;
	&:hover {
		box-shadow    : var(--hover-shadow);
	}
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