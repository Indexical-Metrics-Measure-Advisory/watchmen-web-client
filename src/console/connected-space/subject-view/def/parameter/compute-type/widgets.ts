import styled from 'styled-components';
import {DROPDOWN_Z_INDEX} from '../../../../../../basic-widgets/constants';

export const ParameterComputeTypeContainer = styled.div.attrs({'data-widget': 'parameter-computed-type'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : start;
	justify-self     : start;
	height           : var(--param-height);
	color            : var(--primary-color);
	background-color : var(--bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 2);
	margin-right     : calc(var(--margin) / 2);
	cursor           : pointer;
	outline          : none;
	box-shadow       : var(--param-border);
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
	&:before {
		content    : '';
		display    : block;
		position   : absolute;
		bottom     : calc(100% + 1px);
		left       : 50%;
		width      : 1px;
		height     : calc(var(--margin) / 4);
		box-shadow : var(--param-left-border);
		z-index    : -1;
	}
`;
export const ParameterComputeTypeLabel = styled.div.attrs({'data-widget': 'parameter-computed-type-label'})`
	font-variant : petite-caps;
`;
export const ParameterComputeTypeIcon = styled.div.attrs({'data-widget': 'parameter-computed-type-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	> svg {
		font-size : 0.8em;
	}
`;
export const PARAMETER_TYPE_DROPDOWN_HEIGHT = 200;
export const ParameterComputeTypeDropdown = styled.div.attrs<{ visible: boolean, top?: number, bottom?: number, left: number }>(
    ({visible, top, bottom, left}) => {
        return {
            'data-widget': 'parameter-computed-type-dropdown',
            style: {
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
                top, bottom, left,
                transition: visible ? (void 0) : 'none'
            }
        };
    })<{ visible: boolean, top?: number, bottom?: number, left: number }>`
	display          : flex;
	position         : fixed;
	flex-wrap        : wrap;
	background-color : var(--bg-color);
	padding          : calc(var(--margin) / 4) calc(var(--margin) / 2) 0 calc(var(--margin) / 4);
	width            : 400px;
	max-height       : ${PARAMETER_TYPE_DROPDOWN_HEIGHT}px;
	border-radius    : var(--border-radius);
	box-shadow       : var(--param-border);
	z-index          : ${DROPDOWN_Z_INDEX};
	overflow-y       : auto;
	transition       : opacity 300ms ease-in-out, box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const ParameterComputeTypeOption = styled.div.attrs<{ selected: boolean }>(({selected}) => {
    return {
        'data-widget': 'parameter-compute-type-option',
        style: {
            backgroundColor: selected ? 'var(--primary-color)' : (void 0),
            color: selected ? 'var(--invert-color)' : (void 0)
        }
    };
})<{ selected: boolean }>`
	display       : flex;
	align-items   : center;
	font-variant  : petite-caps;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	border-radius : calc(var(--param-height) / 2);
	box-shadow    : ${({selected}) => selected ? 'var(--param-primary-color)' : 'var(--param-border)'};
	transition    : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;


