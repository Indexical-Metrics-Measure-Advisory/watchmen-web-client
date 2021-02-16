import React from 'react';
import { useExpanded } from '../stage-effect/use-expanded';
import { StageBodyContainer } from './widgets';

export const StageBody = (props: { children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const expanded = useExpanded();

	return <StageBodyContainer expanded={expanded}>
		{children}
	</StageBodyContainer>;
};