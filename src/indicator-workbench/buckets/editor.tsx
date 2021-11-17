import {Bucket} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import {TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {BucketEventBusProvider} from './bucket-event-bus';
import {BucketDescriptionInput} from './bucket/bucket-description-input';
import {BucketNameInput} from './bucket/bucket-name-input';
import {BucketTypeInput} from './bucket/bucket-type-input';
import {CategoryMeasureBucketEditor} from './category-measure-bucket';
import {NumericValueBucketEditor} from './value-bucket';
import {NumericValueMeasureBucketEditor} from './value-measure-bucket';

const BucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	return <BucketEventBusProvider>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.NAME_LABEL}</TuplePropertyLabel>
		<BucketNameInput bucket={bucket}/>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.TYPE_LABEL}</TuplePropertyLabel>
		<BucketTypeInput bucket={bucket}/>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.DESCRIPTION_LABEL}</TuplePropertyLabel>
		<BucketDescriptionInput bucket={bucket}/>
		<NumericValueBucketEditor bucket={bucket}/>
		<NumericValueMeasureBucketEditor bucket={bucket}/>
		<CategoryMeasureBucketEditor bucket={bucket}/>
	</BucketEventBusProvider>;
};

export const renderEditor = (bucket: Bucket) => {
	return <BucketEditor bucket={bucket}/>;
};
