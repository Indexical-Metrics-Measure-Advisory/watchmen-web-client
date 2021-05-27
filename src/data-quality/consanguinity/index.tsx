import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLI} from '../widgets/cli';
import {ICON_PIPELINE, ICON_SPACE, ICON_SUBJECT, ICON_TOPIC} from '../../basic-widgets/constants';

const DataQualityConsanguinityIndex = () => {
	const shortcuts = [
		{label: 'Find Pipeline', command: '/pipeline', icon: ICON_PIPELINE},
		{label: 'Find Topic', command: '/topic', icon: ICON_TOPIC},
		{label: 'Find Space', command: '/space', icon: ICON_SPACE},
		{label: 'Find Subject', command: '/subject', icon: ICON_SUBJECT}
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