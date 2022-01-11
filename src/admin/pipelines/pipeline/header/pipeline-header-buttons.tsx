import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {HeaderCatalogButton} from './header-catalog-button';
import {HeaderDisableButton} from './header-disable-button';
import {HeaderDslButton} from './header-dsl-button';
import {HeaderEnableButton} from './header-enable-button';
import {HeaderFocusModeButtons} from './header-focus-mode-buttons';
import {HeaderSaveButton} from './header-save-button';

export const PipelineHeaderButtons = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	return <PageHeaderButtons>
		<HeaderSaveButton pipeline={pipeline}/>
		<HeaderDisableButton pipeline={pipeline}/>
		<HeaderEnableButton pipeline={pipeline}/>
		<PageHeaderButtonSeparator/>
		<HeaderDslButton pipeline={pipeline}/>
		<PageHeaderButtonSeparator/>
		<HeaderFocusModeButtons pipeline={pipeline}/>
		<PageHeaderButtonSeparator/>
		<HeaderCatalogButton pipeline={pipeline}/>
	</PageHeaderButtons>;
};