import {ActionElementType, RunTableBodyCell, RunTableBodyRow} from '../widgets';
import React from 'react';
import {ActionRuntimeContext} from '../types';
import {getActionType} from '../../../utils';
import {ActionRunStatusCell} from './action-run-status-cell';

export const ActionRun = (props: { context: ActionRuntimeContext }) => {
	const {context} = props;

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><ActionElementType>a</ActionElementType>{getActionType(context.action)}</RunTableBodyCell>
			<RunTableBodyCell>
				<ActionRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
		</RunTableBodyRow>
	</>;
};