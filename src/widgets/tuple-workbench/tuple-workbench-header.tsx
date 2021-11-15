import {IconProp} from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import {TupleCreate} from './tuple-create';
import {TupleMoreButton} from './tuple-more-action-button';
import {TupleSearchBar} from './tuple-search-bar';
import {TupleWorkbenchHeaderContainer} from './widgets';

export const TupleWorkbenchHeader = (props: {
	createButtonLabel?: string;
	canCreate: boolean;
	moreButtons?: Array<{ label: string, icon: IconProp, action: () => void }>;
	searchPlaceholder?: string;
}) => {
	const {
		createButtonLabel, canCreate, moreButtons = [],
		searchPlaceholder
	} = props;

	return <TupleWorkbenchHeaderContainer>
		<TupleSearchBar placeholder={searchPlaceholder} canCreate={canCreate}/>
		<TupleCreate label={createButtonLabel} visible={canCreate}/>
		{moreButtons.map(button => {
			return <TupleMoreButton label={button.label} icon={button.icon} action={button.action} key={button.label}/>;
		})}
	</TupleWorkbenchHeaderContainer>;
};