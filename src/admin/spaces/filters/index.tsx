import {SpaceFilter} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {TopFilterEdit} from './top-filter-edit';
import {SpaceFilterContainer} from './widgets';

export const RestrictionFilter = (props: { filter: SpaceFilter; topic: Topic; }) => {
	const {filter, topic} = props;

	return <SpaceFilterContainer>
		<TopFilterEdit topic={topic} filter={filter}/>
	</SpaceFilterContainer>;
};