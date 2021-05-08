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
		<TupleCreate label={createButtonLabel} visible={canCreate}/>
		<TupleSearchBar placeholder={searchPlaceholder} canCreate={canCreate}/>
	</TupleWorkbenchHeaderContainer>;
};