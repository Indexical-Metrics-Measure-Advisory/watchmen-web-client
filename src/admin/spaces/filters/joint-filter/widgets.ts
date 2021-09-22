import styled from 'styled-components';

export const FilterJointContainer = styled.div.attrs({'data-widget': 'filter-joint-edit'})`
	display               : grid;
	grid-template-columns : auto auto auto auto 1fr;
	grid-row-gap          : calc(var(--margin) / 4);
`;
export const FilterJointTypeEditContainer = styled.div.attrs({'data-widget': 'filter-joint-type-edit'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : flex-start;
	justify-self     : start;
	height           : var(--param-height);
	background-color : var(--param-bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 4);
	cursor           : pointer;
	outline          : none;
	box-shadow       : var(--param-border);
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--param-border), var(--primary-hover-shadow);
	}
`;
export const FilterJointTypeButton = styled.div.attrs<{ active: boolean, edit: boolean }>(({active, edit}) => {
	return {
		'data-widget': 'filter-joint-type-button',
		style: {
			backgroundColor: active ? (void 0) : 'var(--bg-color)',
			color: active ? (void 0) : 'var(--font-color)',
			width: (!active && !edit) ? 0 : (void 0),
			padding: (!active && !edit) ? 0 : (void 0)
		}
	};
})<{ active: boolean, edit: boolean }>`
	display       : flex;
	position      : relative;
	align-self    : stretch;
	align-items   : center;
	font-variant  : petite-caps;
	font-weight   : var(--font-bold);
	padding       : 0 calc(var(--margin) / 4);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : clip;
	box-shadow    : var(--param-left-border);
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const FilterJointTypeIcon = styled.div.attrs({'data-widget': 'filter-joint-type-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;
export const AddSubFilterIcon = styled.div.attrs<{ singleton: boolean }>(({singleton}) => {
	return {
		'data-widget': 'filter-add-sub-icon',
		style: {
			borderTopRightRadius: singleton ? 'calc(var(--param-height) / 2)' : (void 0),
			borderBottomRightRadius: singleton ? 'calc(var(--param-height) / 2)' : (void 0)
		}
	};
})<{ singleton: boolean }>`
	display                    : flex;
	position                   : relative;
	align-items                : center;
	padding                    : 0 calc(var(--margin) / 2);
	height                     : var(--param-height);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	font-variant               : petite-caps;
	cursor                     : pointer;
	box-shadow                 : var(--param-border);
	transition                 : box-shadow 300ms ease-in-out;
	&:hover {
		z-index          : 1;
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
	}
	> svg {
		font-size    : 0.8em;
		margin-right : calc(var(--margin) / 4);
	}
`;
export const FirstAddSubFilterIcon = styled(AddSubFilterIcon)`
	border-radius : calc(var(--param-height) / 2) 0 0 calc(var(--param-height) / 2);
	margin-left   : calc(var(--margin) / 2);
	box-shadow    : var(--param-top-border), var(--param-left-border), var(--param-bottom-border);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		left             : calc(var(--margin) / -2 - 1px);
		top              : 50%;
		height           : 1px;
		width            : calc(var(--margin) / 2);
		background-color : var(--param-bg-color);
	}
`;
export const NonTopJointFilterContainer = styled.div.attrs({'data-widget': 'non-top-filter-joint'})`
	display     : block;
	position    : relative;
	grid-column : span 5;
	margin-left : var(--margin);
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2 + 3px) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height) + 3px);
		z-index                   : -1;
		border-bottom-left-radius : 2px;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:not(:last-child):after {
		content    : '';
		display    : block;
		position   : absolute;
		top        : calc(var(--param-height) / 2 - 3px);
		right      : 100%;
		width      : calc(var(--margin) / 4);
		height     : calc(100% - var(--param-height) / 2 - 3px);
		z-index    : -1;
		box-shadow : var(--param-left-border);
	}
`;
