import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {getPipelineName} from '../../utils';

export const CMD_PIPELINE = '/pipeline';

export const CMD_ARGUMENT_LIST = 'list';
export const CMD_ARGUMENT_NONAME = 'noname';
export const CMD_ARGUMENT_INVALID = 'invalid';
export const CMD_ARGUMENT_VALID = 'valid';
export const CMD_ARGUMENT_ENABLED = 'enabled';
export const CMD_ARGUMENT_DISABLED = 'disabled';

export const CMD_ARGUMENT_OF = 'of';

const PipelineFindCmd: Command = {
	label: '',
	command: '',
	reminder: 'An id or part of name',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};

const PipelineListNonameCmd: Command = {
	label: 'Noname',
	command: CMD_ARGUMENT_NONAME,
	reminder: 'Press "enter" to list all noname pipelines.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
const PipelineInvalidCmd: Command = {
	label: 'Invalid',
	command: CMD_ARGUMENT_INVALID,
	reminder: 'Press "enter" to list all pipelines still failed on validation.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
const PipelineValidCmd: Command = {
	label: 'Valid',
	command: CMD_ARGUMENT_VALID,
	reminder: 'Press "enter" to list all pipelines passed validation.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
const PipelineEnabledCmd: Command = {
	label: 'Enabled',
	command: CMD_ARGUMENT_ENABLED,
	reminder: 'Press "enter" to list all enabled pipelines.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
const PipelineDisabledCmd: Command = {
	label: 'Disabled',
	command: CMD_ARGUMENT_DISABLED,
	reminder: 'Press "enter" to list all disabled pipelines.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};

const PipelineListCmd: Command = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all pipelines.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [PipelineListNonameCmd, PipelineEnabledCmd, PipelineDisabledCmd, PipelineValidCmd, PipelineInvalidCmd],
	executableOnNoTrail: true
};

const PipelineListTopicCmd: Command = {
	label: 'Topic',
	command: 'topic',
	reminder: 'Press "enter" to list topics',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};
const PipelineOutgoingCmd: Command = {
	label: 'List Outgoing',
	command: 'out',
	reminder: 'Press "enter" to list all outgoing; or "topic" to list on topic level',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineListTopicCmd],
	executableOnNoTrail: true
};
const PipelineIngoingCmd: Command = {
	label: 'List Ingoing',
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
	reminder: 'An id, or a fully qualified name of pipeline',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineIdCmd],
	executableOnNoTrail: false
};
export const PipelineCmd: Command = {
	label: 'Pipeline',
	command: CMD_PIPELINE,
	reminder: 'A text to search by id or name; or "list" to list all',
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
