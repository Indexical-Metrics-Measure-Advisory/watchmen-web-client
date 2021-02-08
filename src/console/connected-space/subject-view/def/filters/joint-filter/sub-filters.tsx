import { v4 } from 'uuid';
import { Subject, SubjectDataSetFilterJoint } from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { FilterEdit } from './filter-edit';

export const SubFilters = (props: {
	subject: Subject;
	joint: SubjectDataSetFilterJoint
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, joint, availableTopics, pickedTopics } = props;

	return <>
		{joint.filters.map(filter => {
			return <FilterEdit subject={subject} filter={filter}
			                   availableTopics={availableTopics} pickedTopics={pickedTopics}
			                   key={v4()}/>;
		})}
	</>;
};