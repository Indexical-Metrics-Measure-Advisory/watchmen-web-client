import {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface CommandShortcut {
	label: string;
	command: string;
	icon?: IconProp;
	reminder?: string;
	standalone: boolean;
}