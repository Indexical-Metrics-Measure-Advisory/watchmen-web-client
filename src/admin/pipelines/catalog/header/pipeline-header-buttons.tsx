import React from 'react';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '../../../../basic-widgets/page-header-buttons';
import {AssembledPipelinesGraphics} from '../types';
import {HeaderSwitchGraphicsButton} from './header-switch-graphics-button';
import {PipelinesGraphics} from '../../../../services/tuples/pipeline-types';
import {HeaderCreateGraphicsButton} from './header-create-graphics-button';
import {HeaderPickTopicsButton} from './header-pick-topics-button';
import {Topic} from '../../../../services/tuples/topic-types';
import {HeaderDeleteMeButton} from './header-delete-me-buttton';
import {isPipelinesDownloadEnabled} from '../../../../feature-switch';
import {HeaderExportButton} from './header-export-buttton';
import {HeaderImportButton} from './header-import-buttton';

export const PipelineHeaderButtons = (props: {
		topics: Array<Topic>;
		allGraphics: Array<PipelinesGraphics>;
		graphics: AssembledPipelinesGraphics
	}) => {
		const {topics, allGraphics, graphics} = props;

		const showSwitch = allGraphics.length > 1;
		const showPickTopics = allGraphics.length > 1;
		const canRemove = allGraphics.length > 1;

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
			{canDownloadPipelines
				? <>
					<PageHeaderButtonSeparator/>
					<HeaderImportButton graphics={graphics}/>
					<HeaderExportButton graphics={graphics}/>
				</>
				: null}
		</PageHeaderButtons>;
	}
;