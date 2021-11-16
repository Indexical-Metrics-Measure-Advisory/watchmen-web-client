import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
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

const BucketCard = (props: { bucket: QueryBucket }) => {
	const {bucket} = props;

	const {fire} = useTupleEventBus();

	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, bucket);
	};

	return <TupleCard key={bucket.bucketId} onClick={onEditClicked}>
		<TupleCardTitle>
			<span>{bucket.name}</span>
		</TupleCardTitle>
		<TupleCardDescription>{bucket.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem
				tooltip={{label: Lang.INDICATOR_WORKBENCH.BUCKET.CREATE_AT, alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(bucket.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem
				tooltip={{label: Lang.INDICATOR_WORKBENCH.BUCKET.LAST_MODIFIED_AT, alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(bucket.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (bucket: QueryBucket) => {
	return <BucketCard bucket={bucket}/>;
};