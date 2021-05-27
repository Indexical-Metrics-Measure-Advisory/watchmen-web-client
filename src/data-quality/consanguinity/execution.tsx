import {ExecutionContent} from '../widgets/cli/types';
import {PipelineList} from './pipeline-list';
import {TopicList} from './topic-list';

export const Execution = (props: {
	content: ExecutionContent;
}) => {
	const {content} = props;

	return <>
		<PipelineList content={content}/>
		<TopicList content={content}/>
	</>;
};