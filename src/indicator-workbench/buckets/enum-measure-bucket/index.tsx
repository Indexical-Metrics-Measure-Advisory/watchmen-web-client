import {Bucket, EnumMeasureBucket} from '@/services/data/tuples/bucket-types';
import {defendEnumMeasureBucket, isEnumMeasureBucket} from '@/services/data/tuples/bucket-utils';
import React from 'react';
import {useBucketDefend} from '../use-bucket-defend';

export const EnumMeasureBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const typeCheck = useBucketDefend<EnumMeasureBucket>(bucket, defendEnumMeasureBucket, isEnumMeasureBucket);

	if (!typeCheck) {
		return null;
	}

	return <>
	</>;
};
