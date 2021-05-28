import {ExecutionContent} from '../widgets/cli/types';
import {isPipelineCommand, PipelineCommand} from './pipeline';
import {isTopicCommand, TopicCommand} from './topic';

export const Execution = (props: {
	content: ExecutionContent;
}) => {
	const {content} = props;

	return <>
		{isPipelineCommand(content) ? <PipelineCommand content={content}/> : null}
		{isTopicCommand(content) ? <TopicCommand content={content}/> : null}
	</>;
};