import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {QuerySpace} from '../../services/tuples/query-space-types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {prettifyDateTimeToMinute} from '../../services/tuples/utils';

const SpaceCard = (props: { space: QuerySpace }) => {
	const {space} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, space);
	};
	return <TupleCard key={space.spaceId} onClick={onEditClicked}>
		<TupleCardTitle>{space.name}</TupleCardTitle>
		<TupleCardDescription>{space.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(space.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(space.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (space: QuerySpace) => {
	return <SpaceCard space={space}/>;
};