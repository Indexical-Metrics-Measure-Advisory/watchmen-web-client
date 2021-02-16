import React from 'react';
import { useExpanded } from '../unit-effect/use-expanded';
import { UnitBodyContainer } from './widgets';

export const UnitBody = (props: { children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const expanded = useExpanded();

	return <UnitBodyContainer expanded={expanded}>
		{children}
	</UnitBodyContainer>;
};