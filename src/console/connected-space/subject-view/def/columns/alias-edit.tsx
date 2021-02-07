import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { Lang } from '../../../../../langs';
import { Parameter } from '../../../../../services/tuples/factor-calculator-types';
import { Factor } from '../../../../../services/tuples/factor-types';
import { SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { useParameterEventBus } from '../parameter/parameter-event-bus';
import { ParameterEventTypes } from '../parameter/parameter-event-bus-types';
import { useColumnEventBus } from './column-event-bus';
import { ColumnEventTypes } from './column-event-bus-types';
import { AliasEdit, AliasEditInput, AliasLabel } from './widgets';

const rebuildName = (name: string) => {
	return name.split(/\s|-/g).filter(x => !!x).reduce((name, part) => {
		return name + part.substr(0, 1).toUpperCase() + part.substr(1);
	}, '');
};

export const AliasEditor = (props: { column: SubjectDataSetColumn }) => {
	const { column } = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const { fire: fireColumn } = useColumnEventBus();
	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onFactorChanged = (parameter: Parameter, factor: Factor) => {
			if (!column.alias || !column.alias.trim()) {
				column.alias = rebuildName(factor.label || factor.name);
				forceUpdate();
				fireColumn(ColumnEventTypes.ALIAS_CHANGED, column);
			}
		};
		on(ParameterEventTypes.FACTOR_CHANGED, onFactorChanged);
		return () => {
			off(ParameterEventTypes.FACTOR_CHANGED, onFactorChanged);
		};
	}, [ on, off, fireColumn, forceUpdate, column ]);

	const onLabelClicked = () => {
		inputRef.current?.focus();
	};
	const onAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value === column.alias) {
			return;
		}

		column.alias = value;
		forceUpdate();
		fireColumn(ColumnEventTypes.ALIAS_CHANGED, column);
	};

	return <AliasEdit>
		<AliasLabel onClick={onLabelClicked}>{Lang.CONSOLE.CONNECTED_SPACE.ALIAS}</AliasLabel>
		<AliasEditInput value={column.alias || ''} onChange={onAliasChange} ref={inputRef}/>
	</AliasEdit>;
};