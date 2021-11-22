import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import React, {ReactNode} from 'react';
import {SortType} from '../bucket-event-bus-types';
import {SegmentsButton} from './segments-button';
import {SegmentsTable} from './segments-table';

export const Segments = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	beforeHeader?: ReactNode;
	header: ReactNode;
	cells: (segment: S, index: number) => ReactNode;
	cellsWidth: string;
	canDelete?: (segment: S, index: number) => boolean;
	createSegment: (bucket: B) => S;
	sortSegments?: (bucket: B) => SortType;
	extraButtons?: ReactNode;
}) => {
	const {
		bucket,
		beforeHeader, header, cells, cellsWidth, canDelete,
		createSegment, sortSegments, extraButtons
	} = props;

	return <>
		<SegmentsButton bucket={bucket}/>
		{beforeHeader}
		<SegmentsTable bucket={bucket} header={header}
		               cells={cells} cellsWidth={cellsWidth} canDelete={canDelete}
		               createSegment={createSegment} sortSegments={sortSegments}
		               extraButtons={extraButtons}/>
	</>;
};
