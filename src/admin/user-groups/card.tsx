import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '@/basic-widgets/constants';
import {TooltipAlignment} from '@/basic-widgets/types';
import {QueryUserGroup} from '@/services/tuples/query-user-group-types';
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

const UserGroupCard = (props: { userGroup: QueryUserGroup }) => {
	const {userGroup} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, userGroup);
	};
	return <TupleCard key={userGroup.userGroupId} onClick={onEditClicked}>
		<TupleCardTitle>{userGroup.name}</TupleCardTitle>
		<TupleCardDescription>{userGroup.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(userGroup.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(userGroup.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (userGroup: QueryUserGroup) => {
	return <UserGroupCard userGroup={userGroup}/>;
};