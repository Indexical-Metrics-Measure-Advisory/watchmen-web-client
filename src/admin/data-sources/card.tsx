import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '@/basic-widgets/constants';
import {TooltipAlignment} from '@/basic-widgets/types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {prettifyDateTimeToMinute} from '@/services/tuples/utils';
import {QueryDataSource} from '@/services/tuples/query-data-source-types';

const DataSourceCard = (props: { dataSource: QueryDataSource }) => {
	const {dataSource} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, dataSource);
	};
	return <TupleCard key={dataSource.dataSourceId} onClick={onEditClicked}>
		<TupleCardTitle>{dataSource.dataSourceCode}</TupleCardTitle>
		<TupleCardDescription>
			{dataSource.dataSourceType || ''} @{dataSource.tenantName || ''}
		</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(dataSource.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(dataSource.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (dataSource: QueryDataSource) => {
	return <DataSourceCard dataSource={dataSource}/>;
};