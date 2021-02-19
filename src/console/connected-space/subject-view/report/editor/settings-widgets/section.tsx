import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL } from '../../../../../../basic-widgets/constants';
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
			<span>{title}</span>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
		</SectionContainer>
		{expanded ? children : null}
	</>;
};