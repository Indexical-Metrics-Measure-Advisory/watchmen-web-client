/**
 * behaviour of command sender when command published to executor
 */
import {ReactNode} from 'react';

export enum CommandPublishedBehaviorType {
	CLEAR_ALL = 'clear-all',
	BACKWARD = 'backward',
	KEEP = 'keep'
}

export interface CommandPublishedBehavior {
	type: CommandPublishedBehaviorType;
}

export interface CommandPublishedBehaviorBackward extends CommandPublishedBehavior {
	type: CommandPublishedBehaviorType.BACKWARD;
	steps: number;
}

/**
 * A command has the following features:
 * 1. A label: to display, label might be dynamic computed.
 * 2. A command: to execute, command might be a free text.
 * 3. A reminder: to remind user format of this command.
 * 4. A published behavior: how to process the cli report-workbench after this command is published.
 * 5. Trails: commands can followed after this command.
 * 6. Executable: command can be executable when no trail followed.
 */
export interface Command {
	// label in command shortcut popup
	readonly label: string;
	// command syntax
	readonly command: string;
	// placeholder in command input when this command is the last one of picked commands queue
	// to remind user
	readonly reminder?: string;
	/** next parts of this command */
	readonly trails: Array<Command>;
	/** is executable if no trail */
	readonly executableOnNoTrail: boolean;

	readonly published: CommandPublishedBehavior,
}

export interface HelpCommand extends Command {
	brief: ((props: any) => ReactNode) | ReactNode;
	whole: ((props: any) => ReactNode) | ReactNode;
}
