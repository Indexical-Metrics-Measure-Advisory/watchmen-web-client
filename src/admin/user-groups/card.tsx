import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_REPORT, ICON_SPACE, ICON_TOPIC, ICON_USER} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {QueryUserGroup} from '../../services/tuples/query-user-group-types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';

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
			<TupleCardStatisticsItem tooltip={{label: 'Users Count', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_USER}/>
				<span>{userGroup.userCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Spaces Assigned', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_SPACE}/>
				<span>{userGroup.spaceCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Topics Available', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_TOPIC}/>
				<span>{userGroup.topicCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Reports Created', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_REPORT}/>
				<span>{userGroup.reportCount}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (userGroup: QueryUserGroup) => {
	return <UserGroupCard userGroup={userGroup}/>;
};