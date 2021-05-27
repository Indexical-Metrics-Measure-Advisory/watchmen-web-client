import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLI} from '../widgets/cli';
import {ICON_PIPELINE, ICON_TOPIC} from '../../basic-widgets/constants';
import {CommandShortcut} from '../widgets/cli/types';

const DataQualityConsanguinityIndex = () => {
	const shortcuts: Array<CommandShortcut> = [
		{
			label: 'Find Pipeline',
			command: '/pipeline',
			icon: ICON_PIPELINE,
			reminder: 'A text to match name, or "list" to list all',
			standalone: true
		},
		{
			label: 'Find Topic',
			command: '/topic',
			icon: ICON_TOPIC,
			reminder: 'A text to match name, or "list" to list all.',
			standalone: true
		}
	];

	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Consanguinity</PageTitle>
		</FullWidthPageHeaderContainer>
		<CLI greeting="This channel is for working on consanguinity."
		     shortcuts={shortcuts}/>
	</FullWidthPage>;
};

export default DataQualityConsanguinityIndex;