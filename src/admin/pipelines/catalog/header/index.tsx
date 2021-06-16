import {PageHeaderHolder} from './widgets';
import React from 'react';
import {NameEditor} from './name-editor';
import {AssembledPipelinesGraphics} from '../types';
import {PipelineHeaderButtons} from './pipeline-header-buttons';
import {PipelinesGraphics} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';

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