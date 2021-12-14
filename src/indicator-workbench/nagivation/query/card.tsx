import {QueryNavigation} from '@/services/data/tuples/query-navigation-types';
import {prettifyDateTimeToMinute} from '@/services/data/tuples/utils';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '@/widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

const NavigationCard = (props: { navigation: QueryNavigation }) => {
	const {navigation} = props;

	const {fire} = useTupleEventBus();

	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, navigation);
	};

	return <TupleCard key={navigation.navigationId} onClick={onEditClicked}>
		<TupleCardTitle>
			<span>{navigation.name}</span>
		</TupleCardTitle>
		<TupleCardDescription>{navigation.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem
				tooltip={{label: Lang.INDICATOR_WORKBENCH.NAVIGATION.CREATE_AT, alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(navigation.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem
				tooltip={{
					label: Lang.INDICATOR_WORKBENCH.NAVIGATION.LAST_MODIFIED_AT,
					alignment: TooltipAlignment.CENTER
				}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(navigation.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (navigation: QueryNavigation) => {
	return <NavigationCard navigation={navigation}/>;
};