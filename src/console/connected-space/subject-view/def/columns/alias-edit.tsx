import React, { ChangeEvent } from 'react';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { Lang } from '../../../../../langs';
import { SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { AliasEdit, AliasEditInput, AliasLabel } from './widgets';

export const AliasEditor = (props: { column: SubjectDataSetColumn }) => {
	const { column } = props;

	const forceUpdate = useForceUpdate();

	const onAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === column.alias) {
			return;
		}

		column.alias = value;
		forceUpdate();
	}

	return <AliasEdit>
		<AliasLabel>{Lang.CONSOLE.CONNECTED_SPACE.ALIAS}</AliasLabel>
		<AliasEditInput value={column.alias || ''} onChange={onAliasChange}/>
	</AliasEdit>
};