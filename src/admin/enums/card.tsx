import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_ENUM, ICON_TOPIC } from '../../basic-widgets/constants';
import { TooltipAlignment } from '../../basic-widgets/types';
import { QueryEnum } from '../../services/tuples/query-enum-types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import { useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';

const EnumCard = (props: { enumeration: QueryEnum }) => {
	const { enumeration } = props;

	const { fire } = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, enumeration);
	};
	return <TupleCard key={enumeration.enumId} onClick={onEditClicked}>
		<TupleCardTitle>{enumeration.name}</TupleCardTitle>
		<TupleCardDescription>{enumeration.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{ label: 'In Topics', alignment: TooltipAlignment.CENTER }}>
				<FontAwesomeIcon icon={ICON_TOPIC}/>
				<span>{enumeration.topicCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{ label: 'In Enumerations', alignment: TooltipAlignment.CENTER }}>
				<FontAwesomeIcon icon={ICON_ENUM}/>
				<span>{enumeration.enumCount}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (enumeration: QueryEnum) => {
	return <EnumCard enumeration={enumeration}/>;
};