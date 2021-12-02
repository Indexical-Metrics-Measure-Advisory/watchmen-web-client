import {DetailedHTMLProps, InputHTMLAttributes, ReactNode, SVGProps} from 'react';

export type ReactContent = ((props: any) => ReactNode) | ReactNode;

export enum TooltipAlignment {
	LEFT = 'left',
	RIGHT = 'right',
	CENTER = 'center'
}

export enum TooltipPosition {
	TOP = 'top',
	LEFT = 'left',
	RIGHT = 'right',
	BOTTOM = 'bottom'
}

export type InputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>
	& {
	autoSelect?: boolean;
};

export enum ButtonInk {
	PRIMARY = 'primary',
	DANGER = 'danger',
	SUCCESS = 'success',
	WAIVE = 'waive',
	WARN = 'warn',
	INFO = 'info'
}

export type ButtonProps =
	Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'type'>
	& {
	children?: ReactContent;
	ink?: ButtonInk;
}

export type LogoProps = Omit<SVGProps<SVGSVGElement>, 'ref' | 'xmlns' | 'version' | 'width' | 'height' | 'viewBox'>;

export type DropdownOptionLabel = string | ({ node: ReactNode, label: string });

/**
 * property "key" is optional, it is required when "value" is object or something else which cannot use as identity.
 */
export interface DropdownOption {
	value: any;
	label: string | ((value: DropdownOption) => DropdownOptionLabel);
	key?: string | ((value: DropdownOption) => string);
}

export type DropdownProps = {
	options: Array<DropdownOption>;
	onChange: (option: DropdownOption) => (void | { active: boolean });
	value?: any;
	please?: string;
	/** use this to display label when passed, replace default behaviour */
	display?: () => ReactNode;
}


