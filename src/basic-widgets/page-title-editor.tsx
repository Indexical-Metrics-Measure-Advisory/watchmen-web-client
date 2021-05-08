import React, {ChangeEvent, FocusEvent} from 'react';
import styled from 'styled-components';
import {Input} from './input';

const Container = styled.div.attrs({'data-widget': 'page-title-editor'})`
	display      : flex;
	position     : relative;
	min-width    : 150px;
	padding-left : var(--input-indent);
	transition   : all 300ms ease-in-out;
	&:focus-within {
		flex-grow : 1;
	}
`;
const Label = styled.div.attrs({'data-widget': 'page-title-editor-label'})`
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
const Editor = styled(Input).attrs({'data-widget': 'page-title-editor-input'})`
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
		box-shadow : var(--hover-shadow);
	}
	&:focus {
		box-shadow : var(--primary-hover-shadow);
	}
`;

export const PageTitleEditor = (props: {
	title: string;
	defaultTitle: string;
	onChange: (newTitle: string) => void;
	onChangeComplete: (newTitle: string) => void;
}) => {
	const {title, defaultTitle, onChange, onChangeComplete} = props;

	const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};
	const onBlur = (event: FocusEvent<HTMLInputElement>) => {
		onChangeComplete(event.target.value);
	};

	const label = (title || '').trim() || defaultTitle;

	return <Container>
		<Label>{label}</Label>
		<Editor value={title} placeholder={defaultTitle}
		        onChange={onTextChange} onBlur={onBlur}/>
	</Container>;
};