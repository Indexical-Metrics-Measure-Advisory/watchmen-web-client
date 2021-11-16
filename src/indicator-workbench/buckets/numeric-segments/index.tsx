import {NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';
import React from 'react';
import {SegmentsButton} from './segments-button';
import {SegmentsTable} from './segments-table';

export const NumericSegments = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	return <>
		<SegmentsButton holder={holder}/>
		<SegmentsTable holder={holder}/>
	</>;
};
