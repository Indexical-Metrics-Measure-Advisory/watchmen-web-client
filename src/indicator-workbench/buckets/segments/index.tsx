import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import React, {ReactNode} from 'react';
import {SegmentsButton} from './segments-button';
import {SegmentsTable} from './segments-table';

export const Segments = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	header: () => ReactNode;
	bodyCells: (segment: S) => ReactNode;
	createSegment: (bucket: B) => S;
	sortSegments?: (bucket: B) => void;
}) => {
	const {
		bucket,
		header, bodyCells,
		createSegment, sortSegments
	} = props;

	return <>
		<SegmentsButton bucket={bucket}/>
		<SegmentsTable bucket={bucket} header={header} bodyCells={bodyCells}
		               createSegment={createSegment} sortSegments={sortSegments}/>
	</>;
};
