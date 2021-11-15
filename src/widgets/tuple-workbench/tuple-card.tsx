import {Tuple} from '@/services/data/tuples/tuple-types';
import {prettifyDateTimeToMinute} from '@/services/data/tuples/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '../basic/constants';
import {TooltipButton} from '../basic/tooltip-button';
import {TooltipAlignment} from '../basic/types';
import {useTupleEventBus} from '../tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../tuple-workbench/tuple-event-bus-types';

export const TupleCard = styled.div.attrs({'data-widget': 'tuple-card'})`
	display        : flex;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin);
	position       : relative;
	border-radius  : calc(var(--border-radius) * 2);
	box-shadow     : var(--shadow);
	cursor         : pointer;
	transition     : all 300ms ease-in-out;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;
export const TupleCardTitle = styled.div.attrs({'data-widget': 'tuple-card-title'})`
	display     : flex;
	align-items : center;
	font-family : var(--title-font-family);
	font-size   : 1.6em;
	> span {
		flex-grow : 1;
	}
`;
export const TupleProfileButton = styled(TooltipButton).attrs({'data-widget': 'tuple-profile-button'})`
`;
export const TupleCardDescription = styled.div.attrs({'data-widget': 'tuple-card-description'})`
	display     : flex;
	flex-grow   : 1;
	position    : relative;
	word-break  : break-word;
	font-size   : 0.9em;
	opacity     : 0.8;
	margin-top  : calc(var(--margin) / 2);
	min-height  : 3.5em;
	line-height : 1.5em;
`;
export const TupleCardStatistics = styled.div.attrs({'data-widget': 'tuple-card-statistics'})`
	display         : flex;
	justify-content : space-around;
	line-height     : 1.2em;
	opacity         : 0.7;
	margin          : calc(var(--margin) / 2) calc(var(--margin) / -2) 0;
`;
export const TupleCardStatisticsItem = styled(TooltipButton).attrs({'data-widget': 'tuple-card-statistics-item'})`
	font-size : 0.8em;
	svg {
		margin-right : calc(var(--margin) / 2);
	}
`;
export const StandardTupleCard = (props: {
	tuple: Tuple,
	name: () => string;
	description: () => string | undefined;
}) => {
	const {tuple, name, description} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, tuple);
	};

	return <TupleCard onClick={onEditClicked}>
		<TupleCardTitle>{name()}</TupleCardTitle>
		<TupleCardDescription>{description()}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(tuple.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(tuple.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};