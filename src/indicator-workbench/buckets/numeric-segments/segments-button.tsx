import {NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React, {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentsTableButton} from './widgets';

export const SegmentsButton = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(BucketEventTypes.NUMERIC_SEGMENT_ADDED, forceUpdate);
		on(BucketEventTypes.NUMERIC_SEGMENT_CHANGED, forceUpdate);
		on(BucketEventTypes.NUMERIC_SEGMENT_REMOVED, forceUpdate);
		return () => {
			off(BucketEventTypes.NUMERIC_SEGMENT_ADDED, forceUpdate);
			off(BucketEventTypes.NUMERIC_SEGMENT_CHANGED, forceUpdate);
			off(BucketEventTypes.NUMERIC_SEGMENT_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const segmentCount = holder.segments.length;
	const buttonLabel = segmentCount === 0
		? Lang.INDICATOR_WORKBENCH.BUCKET.NO_NUMERIC_SEGMENT_DEFINED
		: (segmentCount === 1
			? Lang.INDICATOR_WORKBENCH.BUCKET.ONE_NUMERIC_SEGMENT_DEFINED
			: <>{segmentCount} {Lang.INDICATOR_WORKBENCH.BUCKET.N_NUMERIC_SEGMENT_DEFINED}</>);

	return <>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENTS_LABEL}</TuplePropertyLabel>
		<SegmentsTableButton ink={ButtonInk.PRIMARY}>
			<span>{buttonLabel}</span>
		</SegmentsTableButton>
	</>;
};
