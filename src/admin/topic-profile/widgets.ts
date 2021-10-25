import {DIALOG_Z_INDEX} from '@/widgets/basic/constants';
import styled, {keyframes} from 'styled-components';

const ShowDialog = keyframes`
	from {
		opacity          : 0;
		transform        : scale3d(1, 0, 1);
		transform-origin : 50% 20%;
		pointer-events   : none;
	}
	to {
		opacity          : 1;
		transform        : scale3d(1, 1, 1);
		transform-origin : 50% 20%;
		pointer-events   : auto;
	}
`;
const HideDialog = keyframes`
	from {
		opacity          : 1;
		transform        : scale3d(1, 1, 1);
		transform-origin : 50% 20%;
		pointer-events   : auto;
	}
	to {
		opacity          : 0;
		transform        : scale3d(1, 0, 1);
		transform-origin : 50% 20%;
		pointer-events   : none;
	}
`;

export const TopicProfileDialog = styled.div.attrs<{ visible: boolean }>(() => {
	return {
		'data-widget': 'topic-profile-dialog'
	};
})<{ visible: boolean }>`
	position         : fixed;
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	background-color : transparent;
	animation        : ${({visible}) => visible ? ShowDialog : HideDialog} 300ms ease-in-out;
	z-index          : ${DIALOG_Z_INDEX - 1};
`;

export const TopicProfileDialogWrapper = styled.div.attrs({'data-widget': 'topic-profile-dialog-wrapper'})`
	margin-top       : 5vh;
	margin-left      : 5vw;
	width            : 90vw;
	height           : 90vh;
	padding          : calc(var(--margin) / 4) var(--margin) calc(var(--margin) / 2) var(--margin);
	display          : flex;
	flex-direction   : column;
	background-color : var(--bg-color);
	border-radius    : var(--border-radius);
	border           : var(--border);
	box-shadow       : var(--dialog-box-shadow);
`;

export const TopicProfileDialogHeader = styled.div.attrs({'data-widget': 'topic-profile-dialog-header'})`
	display       : flex;
	align-items   : center;
	font-family   : var(--title-font-family);
	font-size     : 2em;
	height        : 2.5em;
	min-height    : 2.5em;
	border-bottom : var(--border);
`;
export const TopicProfileDialogBody = styled.div.attrs({
	'data-widget': 'topic-profile-dialog-body',
	'data-v-scroll': ''
})`
	display               : grid;
	align-items           : start;
	align-content         : start;
	flex-grow             : 1;
	grid-template-columns : 1fr 1fr;
	grid-column-gap       : calc(var(--margin) * 2);
	grid-row-gap          : calc(var(--margin) / 2);
	margin-bottom         : var(--margin);
	margin-right          : calc(var(--margin) / -4);
	padding-right         : calc(var(--margin) / 4);
	overflow-y            : auto;
`;
export const Block = styled.div.attrs<{ column?: number }>(({column = 1}) => {
	return {
		'data-widget': 'block',
		style: {
			gridColumn: column === 1 ? (void 0) : 'span 2'
		}
	};
})<{ column?: number }>`
	display        : flex;
	flex-direction : column;
`;
export const BlockTitle = styled.div.attrs({'data-widget': 'block-title'})`
	display       : flex;
	grid-column   : span 2;
	align-items   : center;
	font-family   : var(--title-font-family);
	font-size     : 1.8em;
	height        : 2.5em;
	border-bottom : var(--border);
	border-width  : calc(var(--border-width) * 2);
`;
export const BlockTitleBadge = styled.span.attrs({'data-widget': 'block-title-badge'})`
	color            : var(--invert-color);
	background-color : var(--warn-color);
	font-size        : var(--font-size);
	height           : 2em;
	line-height      : 2em;
	padding          : 0 calc(var(--margin) / 4);
	margin-left      : calc(var(--margin) / 2);
	border-radius    : 1em;
`;
export const BlockItem = styled.div.attrs({'data-widget': 'block-item'})`
	display               : grid;
	grid-template-columns : 1fr 1fr;
	grid-column-gap       : var(--margin);
	align-items           : center;
	height                : 2.5em;
	border-bottom         : var(--border);
`;
export const BlockItemLabel = styled.div.attrs({'data-widget': 'block-item-label'})`
	display     : flex;
	align-items : center;
	font-weight : var(--font-bold);
	&[data-danger=true] {
		color : var(--danger-color);
	}
`;
export const BlockItemValue = styled.div.attrs({'data-widget': 'block-item-value'})`
	display     : flex;
	align-items : center;
	&[data-danger=true] {
		color : var(--danger-color);
	}
`;
export const WarningBadge = styled.span.attrs({'data-widget': 'warning-badge'})`
	color            : var(--invert-color);
	background-color : var(--warn-color);
	font-family      : var(--title-font-family);
	font-size        : var(--font-size);
	height           : 2em;
	line-height      : 2em;
	padding          : 0 calc(var(--margin) / 2);
	margin-top       : 1px;
	margin-left      : calc(var(--margin) / 2);
	border-radius    : var(--border-radius);
	&[data-type=MISSING] {
		background-color : var(--primary-color);
		filter           : hue-rotate(-30deg);
		&:before {
			content : 'Missing'
		}
	}
	&[data-type=UNSUPPORTED] {
		background-color : var(--warn-color);
		&:before {
			content : 'Unsupported'
		}
	}
	&[data-type=HIGH_CARDINALITY] {
		background-color : var(--primary-color);
		&:before {
			content : 'High Cardinality'
		}
	}
	&[data-type=UNIQUE] {
		background-color : var(--primary-color);
		filter           : hue-rotate(30deg);
		&:before {
			content : 'Unique'
		}
	}
	&[data-type=CONSTANT] {
		background-color : var(--primary-color);
		filter           : hue-rotate(60deg);
		&:before {
			content : 'Constant'
		}
	}
`;
export const FactorBlock = styled.div.attrs({'data-widget': 'factor-block'})`
	display               : grid;
	grid-template-columns : 1fr 1fr 1fr;
	grid-column-gap       : var(--margin);
	border-bottom         : var(--border);
`;
export const FactorBlockColumn = styled.div.attrs({'data-widget': 'factor-block-column'})`
	display        : flex;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) 0;
	> span[data-widget=warning-badge] {
		margin-left : 0;
		align-self  : flex-start;
	}
`;
export const FactorBlockName = styled.div.attrs({'data-widget': 'factor-block-name'})`
	display     : flex;
	align-items : center;
	align-self  : flex-start;
	font-size   : 1.8em;
	font-family : var(--title-font-family);
	height      : 2em;
	color       : var(--primary-color)
`;
export const FactorBlockType = styled.div.attrs({'data-widget': 'factor-block-type'})`
	display       : flex;
	align-items   : center;
	align-self    : flex-start;
	height        : 2em;
	margin-bottom : calc(var(--margin) / 2);
	opacity       : 0.7;
`;
export const FactorBlockValueSampleColumn = styled(FactorBlockColumn)`
	> div[data-widget=block-item] {
		grid-column-gap : calc(var(--margin) / 4);
		> div[data-widget=block-item-label] {
			justify-self : end;
		}
	}
`;
export const ValuePercentage = styled.div.attrs<{ valueCount: string, percentage: number }>({'data-widget': 'value-percentage'})<{ valueCount: string, percentage: number }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	width            : 100%;
	height           : 1.5em;
	margin-top       : 1px;
	background-color : var(--bg-color);
	isolation        : isolate;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : ${({percentage}) => percentage * 100}%;
		height           : 100%;
		background-color : var(--primary-color);
		filter           : hue-rotate(60deg);
		border-radius    : calc(var(--border-radius) / 2);
		z-index          : 0;
	}
	&:after {
		content        : '${({valueCount}) => valueCount}';
		color          : var(--font-color);
		margin-left    : calc(var(--margin) / 4);
		mix-blend-mode : difference;
	}
`;
export const TopicProfileDialogFooter = styled.div.attrs({'data-widget': 'topic-profile-dialog-footer'})`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : var(--header-height);
`;
