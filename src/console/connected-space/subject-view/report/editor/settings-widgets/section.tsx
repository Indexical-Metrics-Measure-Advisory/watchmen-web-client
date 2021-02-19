import React, { useState } from 'react';
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
		</SectionContainer>
		{expanded ? children : null}
	</>;
};