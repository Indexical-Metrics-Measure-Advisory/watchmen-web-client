import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ForwardedRef, forwardRef} from 'react';
import styled from 'styled-components';
import {ICON_LOADING} from './constants';
import {ButtonProps} from './types';

const AButton = styled.button`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	font-family      : var(--font-family);
	font-size        : var(--font-size);
	font-variant     : petite-caps;
	height           : var(--height);
	padding          : 0 var(--button-indent);
	color            : var(--font-color);
	background-color : transparent;
	border           : 0;
	border-radius    : var(--border-radius);
	outline          : none;
	cursor           : pointer;
	white-space      : nowrap;
	transition       : all 300ms ease-in-out;
	&[data-ink=primary] {
		color            : var(--invert-color);
		background-color : var(--primary-color);
		&:hover {
			box-shadow : var(--primary-hover-shadow);
		}
	}
	&[data-ink=danger] {
		color            : var(--invert-color);
		background-color : var(--danger-color);
		&:hover {
			box-shadow : var(--danger-hover-shadow);
		}
	}
	&[data-ink=success] {
		color            : var(--invert-color);
		background-color : var(--success-color);
		&:hover {
			box-shadow : var(--success-hover-shadow);
		}
	}
	&[data-ink=warn] {
		color            : var(--invert-color);
		background-color : var(--warn-color);
		&:hover {
			box-shadow : var(--warn-hover-shadow);
		}
	}
	&[data-ink=info] {
		color            : var(--invert-color);
		background-color : var(--info-color);
		&:hover {
			box-shadow : var(--info-hover-shadow);
		}
	}
	&[data-ink=waive] {
		color            : var(--invert-color);
		background-color : var(--waive-color);
		&:hover {
			box-shadow : var(--waive-hover-shadow);
		}
	}
	&[disabled] {
		cursor           : default;
		background-color : var(--waive-color);
		&:hover {
			box-shadow : none;
		}
	}
	&:hover {
		box-shadow : var(--hover-shadow);
	}
	> svg:first-child:not(:last-child) {
		margin-right : var(--button-icon-gap);
	}
`;

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {children, ink, ...rest} = props;
	return <AButton {...rest} data-ink={ink} ref={ref}>{children}</AButton>;
});
export const DwarfButton = styled(Button)`
	height : var(--button-height-in-form);
	> svg {
		font-size : 0.8em;
	}
`;
export const RoundDwarfButton = styled(Button)`
	height        : var(--button-height-in-form);
	border-radius : calc(var(--button-height-in-form) / 2);
	> svg {
		font-size : 0.8em;
	}
`;

export const CarveButton = styled(Button)`
	overflow : hidden;
	&:after {
		content          : '';
		position         : absolute;
		top              : 50%;
		left             : 50%;
		width            : 0;
		height           : 0;
		border-radius    : 100%;
		background-color : var(--waive-color);
		opacity          : 0.2;
		transition       : top 300ms ease-in-out, left 300ms ease-in-out, width 300ms ease-in-out, height 300ms ease-in-out;
		z-index          : 1;
	}
	&:hover {
		:after {
			top    : -50%;
			left   : -50%;
			width  : 200%;
			height : 200%;
		}
	}
`;
export const DwarfCarveButton = styled(CarveButton)`
	height : var(--button-height-in-form);
	> svg {
		font-size : 0.8em;
	}
`;

const SpinIcon = styled(FontAwesomeIcon).attrs<{ spin: boolean }>(({spin}) => {
	return {
		style: {
			opacity: spin ? (void 0) : 0
		}
	};
})`
	display    : block;
	position   : absolute;
	left       : var(--button-indent);
	opacity    : 0.5;
	transition : margin-right 300ms ease-in-out, opacity 300ms ease-in-out;
`;

export const LoadingButton = forwardRef((props: ButtonProps & { spin?: boolean }, ref: ForwardedRef<HTMLButtonElement>) => {
	const {children, spin, ...rest} = props;

	return <Button {...rest} ref={ref}>
		<SpinIcon icon={ICON_LOADING} spin={spin}/>
		{children}
	</Button>;
});