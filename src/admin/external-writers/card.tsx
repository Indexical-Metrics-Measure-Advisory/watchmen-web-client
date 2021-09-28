import {QueryExternalWriter} from '@/services/data/tuples/query-external-writer-types';
import {prettifyDateTimeToMinute} from '@/services/data/tuples/utils';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';

const ExternalWriterCard = (props: { writer: QueryExternalWriter }) => {
	const {writer} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, writer);
	};
	return <TupleCard key={writer.writerId} onClick={onEditClicked}>
		<TupleCardTitle>{writer.writerCode}</TupleCardTitle>
		<TupleCardDescription>
			{writer.type || ''} @{writer.tenantName || ''}
		</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(writer.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(writer.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (writer: QueryExternalWriter) => {
	return <ExternalWriterCard writer={writer}/>;
};