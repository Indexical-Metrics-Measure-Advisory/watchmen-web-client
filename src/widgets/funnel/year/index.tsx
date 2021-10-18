import {ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import dayjs from 'dayjs';
import React, {ReactNode} from 'react';
import {DropdownOption} from '../../basic/types';
import {DropdownEditor} from '../dropdown';

const MaxFutureYears = 5;
const MaxHistoryYears = 30;
const ThisYear = dayjs().year();
const YearOptions: Array<DropdownOption> = [
	...new Array(MaxFutureYears).fill(1).map((_, index) => ThisYear + MaxFutureYears - index),
	ThisYear,
	...new Array(MaxHistoryYears).fill(1).map((_, index) => ThisYear - MaxHistoryYears + index).reverse()
].map(year => {
	return {
		value: year, label: `${year}`
	};
});

export const YearEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	return <DropdownEditor funnel={funnel} acceptedType={ReportFunnelType.YEAR} options={YearOptions}
	                       pairJoint={pairJoint}/>;
};