import {SpaceFilter} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {TopFilterEdit} from './top-filter-edit';
import {SpaceFilterContainer} from './widgets';

export const RestrictionFilter = (props: { filter: SpaceFilter; topics: Array<Topic> }) => {
	const {filter, topics} = props;

	return <SpaceFilterContainer>
		<TopFilterEdit topics={topics} filter={filter}/>
	</SpaceFilterContainer>;
};