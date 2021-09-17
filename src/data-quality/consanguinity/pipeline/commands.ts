import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {CMD_ARGUMENT_INSPECT, CMD_ARGUMENT_LIST, CMD_ARGUMENT_VIEW} from '../../command';
import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';
import {getPipelineName} from '../../utils';

export const CMD_PIPELINE = '/pipeline';

export const CMD_ARGUMENT_NONAME = 'noname';
export const CMD_ARGUMENT_INVALID = 'invalid';
export const CMD_ARGUMENT_VALID = 'valid';
export const CMD_ARGUMENT_ENABLED = 'enabled';
export const CMD_ARGUMENT_DISABLED = 'disabled';

const PipelineFindCmd: Command = {
	label: '',
	command: '',
	reminder: 'An id or part of name',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};

const PipelineListCmd: Command = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all pipelines; or add restriction argument',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [
		{
			label: 'Noname', command: CMD_ARGUMENT_NONAME,
			reminder: 'Press "enter" to list all noname pipelines'
		},
		{
			label: 'Invalid', command: CMD_ARGUMENT_INVALID,
			reminder: 'Press "enter" to list all pipelines still failed on validation'
		},
		{
			label: 'Valid', command: CMD_ARGUMENT_VALID,
			reminder: 'Press "enter" to list all pipelines passed validation'
		},
		{
			label: 'Enabled', command: CMD_ARGUMENT_ENABLED,
			reminder: 'Press "enter" to list all enabled pipelines'
		},
		{
			label: 'Disabled', command: CMD_ARGUMENT_DISABLED,
			reminder: 'Press "enter" to list all disabled pipelines'
		}
	].map(item => {
		return {
			...item,
			published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
			trails: [],
			executableOnNoTrail: true
		};
	}),
	executableOnNoTrail: true
};

const PipelineIdCmd: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to view detail',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};
const PipelineViewCmd: Command = {
	label: 'View',
	command: CMD_ARGUMENT_VIEW,
	reminder: 'An id, or a fully qualified name of pipeline',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineIdCmd],
	executableOnNoTrail: false
};

const PipelineInspectCmd: Command = {
	label: 'Inspect',
	command: CMD_ARGUMENT_INSPECT,
	reminder: 'Press "enter" to inspect pipelines',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};

export const PipelineCmd: Command = {
	label: 'Pipeline',
	command: CMD_PIPELINE,
	reminder: 'A text to search by id or name; or "list" to list all',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [PipelineFindCmd, PipelineListCmd, PipelineViewCmd, PipelineInspectCmd],
	executableOnNoTrail: false
};

export const buildViewPipelineCommand = (pipeline: Pipeline): Array<Readonly<Command>> => {
	return [PipelineCmd, PipelineViewCmd, {
		...PipelineIdCmd,
		label: getPipelineName(pipeline),
		command: pipeline.pipelineId
	}];
};
