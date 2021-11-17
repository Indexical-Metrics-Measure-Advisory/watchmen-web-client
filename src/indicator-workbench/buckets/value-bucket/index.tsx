import {Bucket, NumericValueBucket} from '@/services/data/tuples/bucket-types';
import {defendNumericValueSegmentsHolder, isNumericValueBucket} from '@/services/data/tuples/bucket-utils';
import React from 'react';
import {NumericSegmentHolderEditor} from '../numeric-segments-holder';
import {useBucketDefend} from '../use-bucket-defend';

export const NumericValueBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const typeCheck = useBucketDefend<NumericValueBucket>(bucket, defendNumericValueSegmentsHolder, isNumericValueBucket);

	if (!typeCheck) {
		return null;
	}

	return <NumericSegmentHolderEditor holder={bucket}/>;
};
