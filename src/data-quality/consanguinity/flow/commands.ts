import {Command, CommandPublishedBehaviorType} from '../../command/types';

export const CMD_FLOW = '/flow';

export const CMD_ARGUMENT_START = 'start';
export const CMD_ARGUMENT_STOP = 'stop';

const FlowStopCmd: Command = {
	label: 'Stop By',
	command: CMD_ARGUMENT_STOP,
	reminder: 'An id, or a fully qualified name of topic',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [{
		label: '',
		command: '',
		reminder: 'Press "enter" to view flow; or set endpoint by "start"',
		published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
		trails: [{
			label: 'Start From',
			command: CMD_ARGUMENT_START,
			reminder: 'An id, or a fully qualified name of topic',
			published: {type: CommandPublishedBehaviorType.KEEP},
			trails: [{
				label: '',
				command: '',
				reminder: 'Press "enter" to view flow',
				published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
				trails: [],
				executableOnNoTrail: true
			}],
			executableOnNoTrail: false
		}],
		executableOnNoTrail: true
	}],
	executableOnNoTrail: false
};
const FlowStartCmd: Command = {
	label: 'Start From',
	command: CMD_ARGUMENT_START,
	reminder: 'An id, or a fully qualified name of topic',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [{
		label: '',
		command: '',
		reminder: 'Press "enter" to view flow; or set endpoint by "stop"',
		published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
		trails: [{
			label: 'Stop By',
			command: CMD_ARGUMENT_STOP,
			reminder: 'An id, or a fully qualified name of topic',
			published: {type: CommandPublishedBehaviorType.KEEP},
			trails: [{
				label: '',
				command: '',
				reminder: 'Press "enter" to view flow',
				published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
				trails: [],
				executableOnNoTrail: true
			}],
			executableOnNoTrail: false
		}],
		executableOnNoTrail: true
	}],
	executableOnNoTrail: false
};

export const FlowCmd: Command = {
	label: 'Flow',
	command: CMD_FLOW,
	reminder: 'Press "enter" to view flow; or set endpoints by "start" and "stop"',
	published: {type: CommandPublishedBehaviorType.KEEP},
	trails: [FlowStartCmd, FlowStopCmd],
	executableOnNoTrail: true
};
