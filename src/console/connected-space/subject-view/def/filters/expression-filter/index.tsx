import { Subject, SubjectDataSetFilterExpression } from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ExpressionFilterContainer } from './widgets';

export const ExpressionFilterEdit = (props: {
	subject: Subject;
	filter: SubjectDataSetFilterExpression;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	// const { subject, filter, availableTopics, pickedTopics } = props;

	return <ExpressionFilterContainer/>;
};