import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {getPipelineName} from '../../utils';

export const CMD_PIPELINE = '/pipeline';

export const CMD_ARGUMENT_FIND = 'find';
export const CMD_ARGUMENT_LIST = 'list';
export const CMD_ARGUMENT_USE = 'use';

export const PipelineNameCriteriaCommand: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to find pipeline',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward
};
export const PipelineFindCmd: Command = {
	label: 'Find',
	command: CMD_ARGUMENT_FIND,
	reminder: 'A text to match name.',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineNameCriteriaCommand],
	executableOnNoTrail: false
};

export const PipelineListCmd: Command = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all pipelines.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};

export const PipelineIdCmd: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to find pipeline',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [],
	executableOnNoTrail: false
};
export const PipelineUseCmd: Command = {
	label: 'Use',
	command: CMD_ARGUMENT_USE,
	reminder: 'Expect a pipeline id',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineIdCmd],
	executableOnNoTrail: false
};
export const PipelineCmd: Command = {
	label: 'Pipeline',
	command: CMD_PIPELINE,
	reminder: '"find" to find pipeline by name, or "list" to list all',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineFindCmd, PipelineListCmd, PipelineUseCmd],
	executableOnNoTrail: false
};

export const buildUsePipelineCommand = (pipeline: Pipeline): Array<Readonly<Command>> => {
	return [PipelineCmd, PipelineUseCmd, {
		label: getPipelineName(pipeline),
		command: pipeline.pipelineId,
		reminder: '"list" for list all relations, or "list topic" for list related topics only, etc.',
		published: {type: CommandPublishedBehaviorType.KEEP},
		trails: [],
		executableOnNoTrail: false
	}];
};
