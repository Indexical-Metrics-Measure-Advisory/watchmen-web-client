import {PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {AssembledPipelinesGraphics} from '../types';
import {NameEditor} from './name-editor';
import {PipelineHeaderButtons} from './pipeline-header-buttons';
import {PageHeaderHolder} from './widgets';

export const CatalogHeader = (props: {
	topics: Array<Topic>;
	allGraphics: Array<PipelinesGraphics>;
	graphics: AssembledPipelinesGraphics
}) => {
	const {topics, allGraphics, graphics} = props;

	return <PageHeaderHolder>
		<NameEditor graphics={graphics}/>
		<PipelineHeaderButtons topics={topics} graphics={graphics} allGraphics={allGraphics}/>
	</PageHeaderHolder>;
};