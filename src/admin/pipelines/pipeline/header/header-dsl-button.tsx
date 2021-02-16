import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DSL } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Pipeline } from '../../../../services/tuples/pipeline-types';

export const HeaderDslButton = (props: { pipeline: Pipeline }) => {
	const onDslClicked = () => {
		// TODO show as DSL
	};

	return <PageHeaderButton tooltip='View in DSL'
	                         onClick={onDslClicked}>
		<FontAwesomeIcon icon={ICON_DSL}/>
	</PageHeaderButton>;
};