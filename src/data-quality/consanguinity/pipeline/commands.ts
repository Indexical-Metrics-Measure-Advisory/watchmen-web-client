import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {getPipelineName} from '../../utils';

export const CMD_PIPELINE = '/pipeline';

export const CMD_ARGUMENT_LIST = 'list';
export const CMD_ARGUMENT_OF = 'of';

const PipelineFindCmd: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to search by name or id',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};

const PipelineListCmd: Command = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all pipelines.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};

const PipelineListTopicCmd: Command = {
	label: 'Topics',
	command: 'topic',
	reminder: 'Press "enter" to list topics',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};
const PipelineOutgoingCmd: Command = {
	label: 'Find Outgoing',
	command: 'out',
	reminder: 'Press "enter" to list all outgoing; or "topic" to list on topic level',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineListTopicCmd],
	executableOnNoTrail: true
};
const PipelineIngoingCmd: Command = {
	label: 'Find Ingoing',
	command: 'in',
	reminder: 'Press "enter" to list all ingoing; or "topic" to list on topic level',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineListTopicCmd],
	executableOnNoTrail: true
};
const PipelineIdCmd: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to list all relevant tuples; or "in" to list ingoing, "out" to list outgoing',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineIngoingCmd, PipelineOutgoingCmd],
	executableOnNoTrail: true
};
const PipelineOfCmd: Command = {
	label: 'Of',
	command: CMD_ARGUMENT_OF,
	reminder: 'Expect a pipeline id',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineIdCmd],
	executableOnNoTrail: false
};
export const PipelineCmd: Command = {
	label: 'Pipeline',
	command: CMD_PIPELINE,
	reminder: 'A text to search; or "list" to list all',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineFindCmd, PipelineListCmd, PipelineOfCmd],
	executableOnNoTrail: false
};

export const buildUsePipelineCommand = (pipeline: Pipeline): Array<Readonly<Command>> => {
	return [PipelineCmd, PipelineOfCmd, {
		...PipelineIdCmd,
		label: getPipelineName(pipeline),
		command: pipeline.pipelineId
	}];
};
