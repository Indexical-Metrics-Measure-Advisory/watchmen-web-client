import {DROPDOWN_Z_INDEX} from '@/widgets/basic/constants';
import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';
import {StepTitleButton} from '../step-widgets';

export const SearchPart = styled.div.attrs<{ buttonFirst: boolean; buttonVisible: boolean; popupVisible: boolean }>(
	({buttonFirst}) => {
		return {
			'data-widget': 'search-text',
			style: {
				flexDirection: buttonFirst ? 'row-reverse' : (void 0),
				justifyContent: buttonFirst ? 'flex-end' : (void 0)
			}
		};
	})<{ buttonFirst: boolean; buttonVisible: boolean; popupVisible: boolean }>`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	> input[data-widget=search-input] {
		border-bottom-left-radius  : ${({popupVisible}) => popupVisible ? 0 : (void 0)};
		border-bottom-right-radius : ${({popupVisible}) => popupVisible ? 0 : (void 0)};
	}
	> button[data-widget=search-button] {
		border-bottom-left-radius  : ${({popupVisible}) => popupVisible ? 0 : (void 0)};
		border-bottom-right-radius : ${({popupVisible}) => popupVisible ? 0 : (void 0)};
	}
	> div[data-widget=search-popup] {
		top            : ${({popupVisible}) => popupVisible ? 'calc(100% - 2px)' : (void 0)};
		opacity        : ${({popupVisible}) => popupVisible ? 1 : (void 0)};
		pointer-events : ${({popupVisible}) => popupVisible ? 'auto' : (void 0)};
	}
`;
export const SearchInput = styled(Input).attrs<{ buttonFirst: boolean; buttonVisible: boolean; visible: boolean }>(
	({buttonFirst, buttonVisible, visible}) => {
		return {
			'data-widget': 'search-input',
			style: {
				width: visible ? (void 0) : 0,
				padding: visible ? (void 0) : 0,
				marginLeft: buttonFirst && visible ? 'calc(var(--height) * -0.6)' : 0,
				marginRight: !buttonFirst && visible ? 'calc(var(--height) * -0.6)' : 0,
				paddingLeft: !buttonFirst && visible ? 'calc(var(--height) * 0.6)' : (buttonFirst && visible ? 'calc(var(--height) * 0.6 + var(--input-indent))' : 0),
				paddingRight: !buttonFirst && visible ? 'calc(var(--height) * 0.6 + var(--input-indent))' : (buttonFirst && visible ? 'calc(var(--height) * 0.6)' : 0),
				borderColor: visible ? (void 0) : 'transparent',
				borderTopLeftRadius: buttonFirst ? 0 : (void 0),
				borderBottomLeftRadius: buttonFirst ? 0 : (void 0),
				borderTopRightRadius: (buttonFirst || !buttonVisible) ? (void 0) : 0,
				borderBottomRightRadius: (buttonFirst || !buttonVisible) ? (void 0) : 0,
				pointerEvents: visible ? (void 0) : 'none'
			}
		};
	})<{ buttonFirst: boolean; buttonVisible: boolean; visible: boolean }>`
	width         : 100%;
	height        : calc(var(--height) * 1.2);
	line-height   : calc(var(--height) * 1.1);
	border-width  : 2px;
	border-color  : var(--primary-color);
	border-radius : calc(var(--height) * 0.6);
	font-size     : 1.2em;
`;
export const SearchButton = styled(StepTitleButton).attrs<{ buttonFirst: boolean; alwaysShowSearchInput: boolean; finding: boolean }>(
	({buttonFirst, alwaysShowSearchInput, finding}) => {
		return {
			'data-widget': 'search-button',
			style: {
				borderTopLeftRadius: !buttonFirst && finding ? 0 : (void 0),
				borderBottomLeftRadius: !buttonFirst && finding ? 0 : (void 0),
				borderTopRightRadius: buttonFirst && finding ? 0 : (void 0),
				borderBottomRightRadius: buttonFirst && finding ? 0 : (void 0),
				cursor: alwaysShowSearchInput ? 'default' : (void 0)
			}
		};
	})<{ buttonFirst: boolean; alwaysShowSearchInput: boolean; finding: boolean }>`
	&&[data-ink]:hover {
		box-shadow : ${({alwaysShowSearchInput}) => alwaysShowSearchInput ? 'none' : (void 0)};
	}
`;
export const SearchPopup = styled.div.attrs({
	'data-widget': 'search-popup',
	'data-v-scroll': ''
})`
	display                    : flex;
	position                   : absolute;
	flex-direction             : column;
	top                        : calc(100% + 18px);
	width                      : 100%;
	min-height                 : calc(var(--height) * 1.2 + 4px);
	max-height                 : calc(var(--height) * 1.2 * 8 + 4px);
	background-color           : var(--bg-color);
	border-width               : 2px;
	border-color               : var(--primary-color);
	border-style               : solid;
	border-bottom-left-radius  : calc(var(--height) * 0.3);
	border-bottom-right-radius : calc(var(--height) * 0.3);
	opacity                    : 0;
	pointer-events             : none;
	overflow-y                 : auto;
	overflow-x                 : hidden;
	transition                 : top 300ms ease-in-out, opacity 300ms ease-in-out;
	z-index                    : ${DROPDOWN_Z_INDEX};
`;
export const CandidateItem = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'search-candidate-item',
		style: {
			backgroundColor: active ? 'var(--hover-color)' : (void 0)
		}
	};
})<{ active: boolean }>`
	display     : flex;
	position    : relative;
	align-items : center;
	min-height  : calc(var(--height) * 1.2);
	padding     : 0 calc(var(--height) * 0.6);
	font-size   : 1.2em;
	cursor      : pointer;
`;
export const OnSearching = styled.div.attrs({'data-widget': 'search-on-searching'})`
	display     : flex;
	position    : relative;
	align-items : center;
	min-height  : calc(var(--height) * 1.2);
	padding     : 0 calc(var(--height) * 0.6);
	> span:last-child {
		margin-left : calc(var(--margin) / 2);
	}
`;