import React from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../../../basic-widgets/page-header-buttons';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { HeaderCatalogButton } from './header-catalog-button';
import { HeaderDisableButton } from './header-disable-button';
import { HeaderEnableButton } from './header-enable-button';
import { HeaderSaveButton } from './header-save-button';

export const PipelineHeaderButtons = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	return <PageHeaderButtons>
		<HeaderSaveButton pipeline={pipeline}/>
		{pipeline.enabled
			? <HeaderDisableButton pipeline={pipeline}/>
			: <HeaderEnableButton pipeline={pipeline}/>}
		<PageHeaderButtonSeparator/>
		<HeaderCatalogButton/>
	</PageHeaderButtons>;
};