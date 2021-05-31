import {ExecutionContent} from '../widgets/cli/types';
import {isPipelineExecution, PipelineExecution} from './pipeline';
import {isTopicExecution, TopicExecution} from './topic';

export const Execution = (props: {
	content: ExecutionContent;
}) => {
	const {content} = props;

	return <>
		{isPipelineExecution(content) ? <PipelineExecution content={content}/> : null}
		{isTopicExecution(content) ? <TopicExecution content={content}/> : null}
	</>;
};