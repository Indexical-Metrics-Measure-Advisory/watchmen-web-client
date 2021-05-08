import {Lang} from '../../../../../langs';
import {ParameterComputeType} from '../../../../../services/tuples/factor-calculator-types';

export const ParameterComputeTypeLabels: { [key in ParameterComputeType]: string } = {
    [ParameterComputeType.NONE]: Lang.PARAMETER.COMPUTE_TYPE.NONE,
    [ParameterComputeType.ADD]: Lang.PARAMETER.COMPUTE_TYPE.ADD,
    [ParameterComputeType.SUBTRACT]: Lang.PARAMETER.COMPUTE_TYPE.SUBTRACT,
    [ParameterComputeType.MULTIPLY]: Lang.PARAMETER.COMPUTE_TYPE.MULTIPLY,
    [ParameterComputeType.DIVIDE]: Lang.PARAMETER.COMPUTE_TYPE.DIVIDE,
    [ParameterComputeType.MODULUS]: Lang.PARAMETER.COMPUTE_TYPE.MODULUS,
    [ParameterComputeType.YEAR_OF]: Lang.PARAMETER.COMPUTE_TYPE.YEAR_OF,
    [ParameterComputeType.HALF_YEAR_OF]: Lang.PARAMETER.COMPUTE_TYPE.HALF_YEAR_OF,
    [ParameterComputeType.QUARTER_OF]: Lang.PARAMETER.COMPUTE_TYPE.QUARTER_OF,
    [ParameterComputeType.MONTH_OF]: Lang.PARAMETER.COMPUTE_TYPE.MONTH_OF,
    [ParameterComputeType.WEEK_OF_YEAR]: Lang.PARAMETER.COMPUTE_TYPE.WEEK_OF_YEAR,
    [ParameterComputeType.WEEK_OF_MONTH]: Lang.PARAMETER.COMPUTE_TYPE.WEEK_OF_MONTH,
    [ParameterComputeType.DAY_OF_MONTH]: Lang.PARAMETER.COMPUTE_TYPE.DAY_OF_MONTH,
    [ParameterComputeType.DAY_OF_WEEK]: Lang.PARAMETER.COMPUTE_TYPE.DAY_OF_WEEK,
    [ParameterComputeType.CASE_THEN]: Lang.PARAMETER.COMPUTE_TYPE.CASE_THEN
};
