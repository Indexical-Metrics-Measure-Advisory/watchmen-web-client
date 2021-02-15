import { ParameterCondition } from '../../../../../../services/tuples/factor-calculator-types';
import { isJointParameter } from '../data-utils';
import { Joint } from '../joint';

export const Condition = (props: { condition: ParameterCondition }) => {
	const { condition } = props;

	if (isJointParameter(condition)) {
		return <Joint joint={condition}/>;
	} else {
		return null;
	}
};