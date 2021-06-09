import React from 'react';
import {TupleCreate} from './tuple-create';
import {TupleSearchBar} from './tuple-search-bar';
import {TupleWorkbenchHeaderContainer} from './widgets';

export const TupleWorkbenchHeader = (props: {
	createButtonLabel?: string;
	canCreate: boolean;
	searchPlaceholder?: string;
}) => {
	const {
		createButtonLabel, canCreate,
		searchPlaceholder
	} = props;

	return <TupleWorkbenchHeaderContainer>
		<TupleSearchBar placeholder={searchPlaceholder} canCreate={canCreate}/>
		<TupleCreate label={createButtonLabel} visible={canCreate}/>
	</TupleWorkbenchHeaderContainer>;
};