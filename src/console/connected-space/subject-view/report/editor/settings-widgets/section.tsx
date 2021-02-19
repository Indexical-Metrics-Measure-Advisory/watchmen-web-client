import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICON_TREE_NODE_COLLAPSED, ICON_TREE_NODE_EXPANDED } from '../../../../../../basic-widgets/constants';
import { SectionContainer } from './widgets';

export const Section = (props: {
	title: string;
	children: ((props: any) => React.ReactNode) | React.ReactNode
}) => {
	const { title, children } = props;

	const [ expanded, setExpanded ] = useState(true);

	const onSectionClicked = () => {
		setExpanded(!expanded);
	};

	return <>
		<SectionContainer expanded={expanded} onClick={onSectionClicked}>
			<FontAwesomeIcon icon={expanded ? ICON_TREE_NODE_EXPANDED : ICON_TREE_NODE_COLLAPSED}/>
			<span>{title}</span>
		</SectionContainer>
		{children}
	</>;
};