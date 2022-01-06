import {DataSource, DataSourceParam} from '@/services/data/tuples/data-source-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent, Fragment} from 'react';
import styled from 'styled-components';
import {v4} from 'uuid';
import {useDataSourceEventBus} from '../data-source-event-bus';
import {DataSourceEventTypes} from '../data-source-event-bus-types';

const ExtraParams = styled.div`
	display               : grid;
	grid-template-columns : 60% 32px calc(40% - 32px);
	grid-auto-rows        : minmax(var(--grid-tall-row-height), auto);
	grid-row-gap          : calc(var(--margin) / 4);
	align-content         : center;
	> span {
		align-self   : center;
		justify-self : center;
		font-weight  : var(--font-bold);
	}
`;
export const DataSourceParams = (props: { dataSource: DataSource }) => {
	const {dataSource} = props;

	const {fire} = useDataSourceEventBus();
	const forceUpdate = useForceUpdate();

	const onParamNameChange = (param: DataSourceParam, prop: 'name' | 'value') => (event: ChangeEvent<HTMLInputElement>) => {
		if (param[prop] !== event.target.value) {
			param[prop] = event.target.value;
			fire(DataSourceEventTypes.DATASOURCE_PARAM_CHANGED, dataSource);
			forceUpdate();
		}
		if (!(dataSource.params || []).includes(param)) {
			dataSource.params = [...(dataSource.params || []), param];
		}
	};

	const params = [...(dataSource.params || []), {name: '', value: ''}].filter(x => x);

	return <>
		<TuplePropertyLabel>Extra Parameters:</TuplePropertyLabel>
		<ExtraParams>
			{params.map(param => {
				return <Fragment key={v4()}>
					<TuplePropertyInput value={param.name || ''} onChange={onParamNameChange(param, 'name')}
					                    placeholder={'Parameter name'}/>
					<span>=</span>
					<TuplePropertyInput value={param.value || ''} onChange={onParamNameChange(param, 'value')}
					                    placeholder={'Parameter value'}/>
				</Fragment>;
			})}
		</ExtraParams>
	</>;
};