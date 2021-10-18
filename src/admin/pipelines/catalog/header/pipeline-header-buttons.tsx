import {isPipelinesDownloadEnabled} from '@/feature-switch';
import {PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {AssembledPipelinesGraphics} from '../types';
import {HeaderCreateGraphicsButton} from './header-create-graphics-button';
import {HeaderDeleteMeButton} from './header-delete-me-buttton';
import {HeaderExportButton} from './header-export-buttton';
import {HeaderImportButton} from './header-import-buttton';
import {HeaderPickTopicsButton} from './header-pick-topics-button';
import {HeaderSwitchGraphicsButton} from './header-switch-graphics-button';

export const PipelineHeaderButtons = (props: {
	topics: Array<Topic>;
	allGraphics: Array<PipelinesGraphics>;
	graphics: AssembledPipelinesGraphics
}) => {
	const {topics, allGraphics, graphics} = props;

	const showSwitch = allGraphics.length > 1;
	const showPickTopics = allGraphics.length > 1;
	const canRemove = allGraphics.length > 1;

	const canUploadPipelines = isPipelinesDownloadEnabled();
	const canDownloadPipelines = isPipelinesDownloadEnabled() && (graphics.topics || []).length !== 0;

	return <PageHeaderButtons>
		<HeaderCreateGraphicsButton/>
		{showSwitch ? <HeaderSwitchGraphicsButton graphics={graphics} allGraphics={allGraphics}/> : null}
		{showPickTopics
			? <>
				<PageHeaderButtonSeparator/>
				<HeaderPickTopicsButton topics={topics} graphics={graphics}/>
			</>
			: null}
		{canRemove
			? <>
				<PageHeaderButtonSeparator/>
				<HeaderDeleteMeButton graphics={graphics}/>
			</>
			: null}
		{canUploadPipelines
			? <>
				<PageHeaderButtonSeparator/>
				<HeaderImportButton/>
				{canDownloadPipelines ? <HeaderExportButton graphics={graphics}/> : null}
			</>
			: null}
	</PageHeaderButtons>;
};