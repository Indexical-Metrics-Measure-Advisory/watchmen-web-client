import React from 'react';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '../../../../basic-widgets/page-header-buttons';
import {AssembledPipelinesGraphics} from '../types';
import {HeaderSwitchGraphicsButton} from './header-switch-graphics-button';
import {PipelinesGraphics} from '../../../../services/tuples/pipeline-types';
import {HeaderCreateGraphicsButton} from './header-create-graphics-button';
import {HeaderPickTopicsButton} from './header-pick-topics-button';
import {Topic} from '../../../../services/tuples/topic-types';

export const PipelineHeaderButtons = (props: {
	topics: Array<Topic>;
	allGraphics: Array<PipelinesGraphics>;
	graphics: AssembledPipelinesGraphics
}) => {
	const {topics, allGraphics, graphics} = props;

	return <PageHeaderButtons>
		<HeaderCreateGraphicsButton/>
		<HeaderSwitchGraphicsButton graphics={graphics} allGraphics={allGraphics}/>
		<PageHeaderButtonSeparator/>
		<HeaderPickTopicsButton topics={topics} graphics={graphics}/>
	</PageHeaderButtons>;
};