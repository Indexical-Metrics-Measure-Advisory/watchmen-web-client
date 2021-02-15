import { ParameterCondition } from '../../../../../../services/tuples/factor-calculator-types';
import { isJointParameter } from '../data-utils';
import { Joint } from '../joint';

export const Condition = (props: { condition: ParameterCondition, removeMe: () => void }) => {
	const { condition, removeMe } = props;

	if (isJointParameter(condition)) {
		return <Joint joint={condition} removeMe={removeMe}/>;
	} else {
		return null;
	}
};