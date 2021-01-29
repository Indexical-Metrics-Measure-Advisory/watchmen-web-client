import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Input } from './input';

const Editor = styled(Input).attrs({ 'data-widget': 'page-title-editor' })`
	margin-left : var(--input-indent);
	align-self  : center;
	font-family : var(--title-font-family);
	font-size   : 3em;
	height      : 1.3em;
	border      : 0;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
	&:focus {
		flex-grow  : 1;
		box-shadow : var(--primary-hover-shadow);
	}
`;

export const PageTitleEditor = (props: {
	title: string;
	onComplete: (newTitle: string) => void;
}) => {
	const { title, onComplete } = props;

	const [ value, setValue ] = useState(title);

	const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setValue(value);
	};
	const onTextBlur = (event: ChangeEvent<HTMLInputElement>) => {
		onComplete(event.target.value.trim());
	};

	return <Editor value={value} onChange={onTextChange}
	               onBlur={onTextBlur}/>;
};