import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';
import {StepTitleButton} from '../step-widgets';

export const SearchPart = styled.div.attrs<{ popupVisible: boolean }>({})<{ popupVisible: boolean }>`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	> input[data-widget=search-input] {
		border-bottom-left-radius : ${({popupVisible}) => popupVisible ? 0 : (void 0)};
	}
	> button[data-widget=search-button] {
		border-bottom-right-radius : ${({popupVisible}) => popupVisible ? 0 : (void 0)};
	}
	> div[data-widget=search-popup] {
		top            : ${({popupVisible}) => popupVisible ? 'calc(100% - 2px)' : (void 0)};
		opacity        : ${({popupVisible}) => popupVisible ? 1 : (void 0)};
		pointer-events : ${({popupVisible}) => popupVisible ? 'auto' : (void 0)};
	}
`;
export const SearchInput = styled(Input).attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'search-input',
		style: {
			width: visible ? (void 0) : 0,
			padding: visible ? (void 0) : 0,
			marginRight: visible ? (void 0) : 0,
			borderColor: visible ? (void 0) : 'transparent',
			pointerEvents: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	width                     : 100%;
	height                    : calc(var(--height) * 1.2);
	line-height               : calc(var(--height) * 1.1);
	margin-right              : calc(var(--height) * -0.6);
	padding-left              : calc(var(--height) * 0.6);
	border-width              : 2px;
	border-color              : var(--primary-color);
	border-top-left-radius    : calc(var(--height) * 0.6);
	border-bottom-left-radius : calc(var(--height) * 0.6);
	font-size                 : 1.2em;
`;
export const SearchButton = styled(StepTitleButton).attrs<{ finding: boolean }>(({finding}) => {
	return {
		'data-widget': 'search-button',
		style: {
			borderTopLeftRadius: finding ? 0 : (void 0),
			borderBottomLeftRadius: finding ? 0 : (void 0)
		}
	};
})<{ finding: boolean }>`
`;
export const SearchPopup = styled.div.attrs({
	'data-widget': 'search-popup',
	'data-v-scroll': ''
})`
	display                    : flex;
	position                   : absolute;
	top                        : calc(100% + 18px);
	width                      : 100%;
	min-height                 : calc(var(--height) * 1.2 + 4px);
	max-height                 : calc(var(--height) * 1.2 * 8 + 4px);
	background-color           : var(--bg-color);
	border-width               : 2px;
	border-color               : var(--primary-color);
	border-style               : solid;
	border-bottom-left-radius  : calc(var(--height) * 0.6);
	border-bottom-right-radius : calc(var(--height) * 0.6);
	opacity                    : 0;
	pointer-events             : none;
	overflow-y                 : auto;
	overflow-x                 : hidden;
	transition                 : top 300ms ease-in-out, opacity 300ms ease-in-out;
`;
export const CandidateItem = styled.div.attrs({'data-widget': 'search-candidate-item'})`
	display     : flex;
	position    : relative;
	align-items : center;
	min-height  : calc(var(--height) * 1.2);
	padding     : 0 calc(var(--height) * 0.6);
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