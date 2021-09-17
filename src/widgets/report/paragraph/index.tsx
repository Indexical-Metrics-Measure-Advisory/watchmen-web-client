import {Paragraph} from '@/services/data/tuples/paragraph';
import React from 'react';
import {Container} from './container';

export const ParagraphPanel = (props: {
	paragraph: Paragraph;
	fixed: boolean;
	editable: boolean;
	removable: boolean;
}) => {
	const {paragraph, fixed, editable, removable} = props;

	return <Container paragraph={paragraph} fixed={fixed}
	                  editable={editable} removable={removable}/>;
};