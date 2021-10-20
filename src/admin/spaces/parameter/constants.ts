import {ParameterComputeType} from '@/services/data/tuples/factor-calculator-types';

export const ParameterComputeTypeLabels: Record<ParameterComputeType, string> = {
	[ParameterComputeType.NONE]: 'None',
	[ParameterComputeType.ADD]: 'Add',
	[ParameterComputeType.SUBTRACT]: 'Subtract',
	[ParameterComputeType.MULTIPLY]: 'Multiply',
	[ParameterComputeType.DIVIDE]: 'Divide',
	[ParameterComputeType.MODULUS]: 'Modulus',
	[ParameterComputeType.YEAR_OF]: 'Year of',
	[ParameterComputeType.HALF_YEAR_OF]: 'Half Year of',
	[ParameterComputeType.QUARTER_OF]: 'Quarter of',
	[ParameterComputeType.MONTH_OF]: 'Month of',
	[ParameterComputeType.WEEK_OF_YEAR]: 'Week of Year',
	[ParameterComputeType.WEEK_OF_MONTH]: 'Week of Month',
	[ParameterComputeType.DAY_OF_MONTH]: 'Day of Month',
	[ParameterComputeType.DAY_OF_WEEK]: 'Day of Week',
	[ParameterComputeType.CASE_THEN]: 'Case Then'
};
