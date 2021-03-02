import React from 'react';
import { Paragraph } from '../../services/tuples/paragraph';
import { Container } from './container';

export const ParagraphPanel = (props: {
	paragraph: Paragraph;
	fixed: boolean;
	editable: boolean;
	/** chart can be readonly mode and editing mode */
	editing: boolean;
	removable: boolean;
}) => {
	const { paragraph, fixed, editable, editing, removable } = props;

	return <Container paragraph={paragraph} fixed={fixed}
	                  editable={editable} editing={editing}
	                  removable={removable}/>;
};