import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_CONNECTION, ICON_REPORT, ICON_TOPIC, ICON_USER_GROUP } from '../../basic-widgets/constants';
import { TooltipAlignment } from '../../basic-widgets/types';
import { QuerySpace } from '../../services/tuples/query-space-types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import { useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';

const SpaceCard = (props: { space: QuerySpace }) => {
	const { space } = props;

	const { fire } = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, space);
	};
	return <TupleCard key={space.spaceId} onClick={onEditClicked}>
		<TupleCardTitle>{space.name}</TupleCardTitle>
		<TupleCardDescription>{space.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{ label: 'Topics Count', alignment: TooltipAlignment.CENTER }}>
				<FontAwesomeIcon icon={ICON_TOPIC}/>
				<span>{space.topicCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{ label: 'Reports Count', alignment: TooltipAlignment.CENTER }}>
				<FontAwesomeIcon icon={ICON_REPORT}/>
				<span>{space.reportCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{ label: 'In User Groups', alignment: TooltipAlignment.CENTER }}>
				<FontAwesomeIcon icon={ICON_USER_GROUP}/>
				<span>{space.groupCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{ label: 'Connections Count', alignment: TooltipAlignment.CENTER }}>
				<FontAwesomeIcon icon={ICON_CONNECTION}/>
				<span>{space.connectionCount}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (space: QuerySpace) => {
	return <SpaceCard space={space}/>;
};