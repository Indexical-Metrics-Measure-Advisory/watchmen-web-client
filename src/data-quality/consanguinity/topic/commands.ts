import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../command/types';
import {CMD_ARGUMENT_LIST, CMD_ARGUMENT_VIEW} from '../../command';
import {getTopicName} from '../../utils';
import {Topic} from '@/services/tuples/topic-types';

export const CMD_TOPIC = '/topic';

export const CMD_ARGUMENT_SYSTEM = 'sys';
export const CMD_ARGUMENT_BIZ = 'biz';
export const CMD_ARGUMENT_RAW = 'raw';
export const CMD_ARGUMENT_DISTINCT = 'distinct';
export const CMD_ARGUMENT_AGGREGATE = 'aggregate';
export const CMD_ARGUMENT_TIME = 'time';
export const CMD_ARGUMENT_RATIO = 'ratio';

const TopicFindCmd: Command = {
	label: '',
	command: '',
	reminder: 'An id or part of name',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};

const TopicListByKind = [
	{
		label: 'System', command: CMD_ARGUMENT_SYSTEM,
		reminder: 'Press "enter" to list all noname pipelines'
	},
	{
		label: 'Business', command: CMD_ARGUMENT_BIZ,
		reminder: 'Press "enter" to list all pipelines still failed on validation'
	}
];
const TopicListByType = [
	{
		label: 'Raw', command: CMD_ARGUMENT_RAW,
		reminder: 'Press "enter" to list all pipelines passed validation'
	},
	{
		label: 'Distinct', command: CMD_ARGUMENT_DISTINCT,
		reminder: 'Press "enter" to list all enabled pipelines'
	},
	{
		label: 'Aggregate', command: CMD_ARGUMENT_AGGREGATE,
		reminder: 'Press "enter" to list all disabled pipelines'
	},
	{
		label: 'Time', command: CMD_ARGUMENT_TIME,
		reminder: 'Press "enter" to list all disabled pipelines'
	},
	{
		label: 'Ratio', command: CMD_ARGUMENT_RATIO,
		reminder: 'Press "enter" to list all disabled pipelines'
	}
];
const buildCommands = (template: Array<Pick<Command, 'label' | 'command' | 'reminder'>>, trails: Array<Command>): Array<Command> => {
	return template.map(item => {
		return {
			...item,
			published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
			trails, executableOnNoTrail: true
		};
	});
};
const TopicListCmd = {
	label: 'List',
	command: CMD_ARGUMENT_LIST,
	reminder: 'Press "enter" to list all topics',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [
		...buildCommands(TopicListByKind, buildCommands(TopicListByType, [])),
		...buildCommands(TopicListByType, buildCommands(TopicListByKind, []))
	],
	executableOnNoTrail: true
};

const TopicIdCmd: Command = {
	label: '',
	command: '',
	reminder: 'Press "enter" to view detail',
	published: {type: CommandPublishedBehaviorType.BACKWARD, steps: 1} as CommandPublishedBehaviorBackward,
	trails: [],
	executableOnNoTrail: true
};
const TopicViewCmd: Command = {
	label: 'View',
	command: CMD_ARGUMENT_VIEW,
	reminder: 'An id, or a fully qualified name of topic',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [TopicIdCmd],
	executableOnNoTrail: false
};

export const TopicCmd: Command = {
	label: 'Topic',
	command: CMD_TOPIC,
	reminder: 'A text to search by id or name; or "list" to list all',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [TopicFindCmd, TopicListCmd, TopicViewCmd],
	executableOnNoTrail: false
};

export const buildViewTopicCommand = (topic: Topic): Array<Readonly<Command>> => {
	return [TopicCmd, TopicViewCmd, {
		...TopicIdCmd,
		label: getTopicName(topic),
		command: topic.topicId
	}];
};
