import {Inspection, InspectionTimeRange} from '@/services/data/tuples/inspection-types';
import {PropOf} from '@/services/types';
import {DropdownProps} from '@/widgets/basic/types';
import {ReactNode} from 'react';

export type TimePeriodDropdownFilter = {
	onValueChange: PropOf<DropdownProps, 'onChange'>;
	options: PropOf<DropdownProps, 'options'>;
	selection: PropOf<DropdownProps, 'display'>
}

export type TimePeriodFilterBuilder = (inspection: Inspection, onValueChanged: () => void) => TimePeriodDropdownFilter;

export type FilterValidTimeRanges = (inspection: Inspection) => Array<InspectionTimeRange>;
export type RangeEquation = (range: InspectionTimeRange, value: any) => boolean;
export type RangeCreator = (value: any) => InspectionTimeRange;
export type RangeCandidate = { value: any, label: string, node?: ReactNode };
export type RangesToLabel = (inspection: Inspection) => Array<ReactNode>;