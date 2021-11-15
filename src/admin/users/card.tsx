import {QueryUser} from '@/services/data/tuples/query-user-types';
import {prettifyDateTimeToMinute} from '@/services/data/tuples/utils';
import {Avatar} from '@/widgets/basic/avatar';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {
	TupleCard,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '@/widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Title = styled(TupleCardTitle)`
	justify-content : space-between;
`;
const UserAvatar = styled(Avatar)`
	font-size : calc(1.3 * var(--font-size));
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
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(user.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(user.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (user: QueryUser) => {
	return <UserCard user={user}/>;
};