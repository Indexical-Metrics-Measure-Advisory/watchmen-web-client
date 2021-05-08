import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {Avatar} from '../../basic-widgets/avatar';
import {ICON_REPORT, ICON_SPACE, ICON_TOPIC} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {QueryUser} from '../../services/tuples/query-user-types';
import {
	TupleCard,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';

const Title = styled(TupleCardTitle)`
	justify-content: space-between;
`;
const UserAvatar = styled(Avatar)`
	font-size: calc(1.3 * var(--font-size));
`;

const UserCard = (props: { user: QueryUser }) => {
	const {user} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, user);
	};
	return <TupleCard key={user.userId} onClick={onEditClicked}>
		<Title>
			<span>{user.name}</span>
			<UserAvatar name={user.name}/>
		</Title>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Spaces Assigned', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_SPACE}/>
				<span>{user.spaceCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Topics Available', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_TOPIC}/>
				<span>{user.topicCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Reports Created', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_REPORT}/>
				<span>{user.reportCount}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (user: QueryUser) => {
	return <UserCard user={user}/>;
};