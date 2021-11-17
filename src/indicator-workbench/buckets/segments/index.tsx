import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import React, {ReactNode} from 'react';
import {SegmentsButton} from './segments-button';
import {SegmentsTable} from './segments-table';

export const Segments = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	header: () => ReactNode;
	cells: (segment: S) => ReactNode;
	cellsWidth: string;
	createSegment: (bucket: B) => S;
	sortSegments?: (bucket: B) => void;
}) => {
	const {
		bucket,
		header, cells, cellsWidth,
		createSegment, sortSegments
	} = props;

	return <>
		<SegmentsButton bucket={bucket}/>
		<SegmentsTable bucket={bucket} header={header}
		               cells={cells} cellsWidth={cellsWidth}
		               createSegment={createSegment} sortSegments={sortSegments}/>
	</>;
};
