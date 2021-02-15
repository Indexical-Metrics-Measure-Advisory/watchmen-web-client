import React from 'react';
import { Conditional } from '../../../../../services/tuples/pipeline-super-types';
import { TopType } from './top-type';
import { ConditionalContainer } from './widgets';

export const ConditionalEditor = (props: {
	conditional: Conditional;
}) => {
	const { conditional } = props;

	return <ConditionalContainer>
		<TopType conditional={conditional}/>
	</ConditionalContainer>;
};