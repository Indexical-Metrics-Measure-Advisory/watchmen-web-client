import styled from 'styled-components';
import { ComputedEdit } from './computed-edit';
import { ConstantEdit } from './constant-edit';
import { ParameterTypeEdit } from './parameter-type-edit';
import { TopicFactorEdit } from './topic-factor-edit';

export const ParameterTypeEditor = styled(ParameterTypeEdit)`
	border-top-right-radius    : 0;
	border-bottom-right-radius : 0;
	& + div[data-widget="subject-def-column-alias-edit"]:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		left             : 0;
		width            : 1px;
		height           : 40%;
		background-color : var(--bg-color);
		opacity          : 0.5;
	}
`;
export const ConstantValueEditor = styled(ConstantEdit)`
	border-radius : 0;
`;
export const TopicFactorEditor = styled(TopicFactorEdit)`
	> div[data-widget=dropdown] {
		&:first-child {
			border-radius : 0;
			box-shadow    : var(--param-top-border), var(--param-bottom-border);
		}
		&:last-child {
			border-radius : 0;
			box-shadow    : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
		}
		// redefine since box-shadow override by first-child/last-child
		&:hover,
		&:focus {
			z-index    : 1;
			box-shadow : var(--primary-hover-shadow);
		}
	}
`;
export const DeleteMeButton = styled.div.attrs({ 'data-widget': 'delete-me-button' })`
	display                    : flex;
	position                   : relative;
	align-self                 : stretch;
	align-items                : center;
	height                     : var(--param-height);
	padding                    : 0 calc(var(--margin) / 4);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	color                      : var(--primary-color);
	box-shadow                 : var(--param-border);
	cursor                     : pointer;
	transition                 : color 300ms ease-in-out, box-shadow 300ms ease-in-out;
	&:hover {
		color      : var(--danger-color);
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const ComputedEditor = styled(ComputedEdit)`
	grid-column  : span 4;
	padding-left : calc(var(--margin) / 2);
`;