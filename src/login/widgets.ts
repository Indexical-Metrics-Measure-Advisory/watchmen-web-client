import {LoadingButton} from '@/widgets/basic/button';
import {Input} from '@/widgets/basic/input';
import {Logo} from '@/widgets/basic/logo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Background2 from '../assets/login-background.svg';
import Background1 from '../assets/login-background.svg';

export const LoginContainer = styled.div.attrs({'data-widget': 'login'})`
	display        : flex;
	flex-direction : column;
	min-width      : 1000px;
	min-height     : calc(100vh - 60px);
	margin-bottom  : 60px;
`;
export const LoginHeader = styled.div.attrs({'data-widget': 'login-header'})`
	display     : flex;
	align-items : center;
	height      : 64px;
	margin      : 0 var(--margin);
`;
export const LoginHeaderLogo = styled(Logo).attrs({'data-widget': 'login-header-logo'})`
	width  : 40px;
	height : 40px;
	filter : drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.3));
	> g > ellipse {
		fill   : var(--font-color);
		stroke : var(--font-color);
	}
`;
export const LoginHeaderTitle = styled.span.attrs({'data-widget': 'login-header-title'})`
	font-variant : petite-caps;
	font-family  : var(--console-title-font-family);
	font-size    : 24px;
	font-style   : italic;
	margin-left  : calc(var(--margin) / 3);
	opacity      : 0.9;
	text-shadow  : 1px 1px 1px rgba(0, 0, 0, 0.3);
	> span {
		font-size : 16px;
		opacity   : 0.8;
	}
`;
export const LoginBody = styled.div.attrs({'data-widget': 'login-body'})`
	flex-grow : 1;
	display   : flex;
`;
export const ImagePart = styled.div.attrs({'data-widget': 'login-body-image-part'})`
	display         : flex;
	justify-content : flex-end;
	width           : 55%;
	padding-top     : 120px;
	padding-right   : 150px;
`;
export const Image = styled.div.attrs<{ avoid: boolean }>(({avoid}) => {
	return {
		'data-widget': 'login-body-image',
		style: {backgroundImage: avoid ? `url(${Background2})` : (void 0)}
	};
})<{ avoid: boolean }>`
	width               : 400px;
	height              : 320px;
	background-image    : url(${Background1});
	background-repeat   : no-repeat;
	background-position : center center;
	background-size     : contain;
	filter              : drop-shadow(4px 2px 6px rgba(0, 0, 0, 0.7));
`;
export const FormPart = styled.div.attrs({'data-widget': 'login-body-form-part'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-top    : 120px;
`;
export const Form = styled.div.attrs({'data-widget': 'login-body-form'})`
	display       : block;
	position      : relative;
	width         : 450px;
	border        : var(--border);
	border-radius : calc(var(--border-radius) * 3);
	padding       : 0 var(--margin);
`;
export const Greeting = styled.div.attrs({'data-widget': 'login-body-greeting'})`
	display     : flex;
	align-items : center;
	height      : 40px;
	margin-top  : var(--margin);
	font-family : var(--title-font-family);
	font-size   : 1.2em;
`;
export const FormBody = styled.div.attrs({'data-widget': 'login-body-form-body'})`
	display               : grid;
	grid-template-columns : 1fr;
	grid-row-gap          : var(--margin);
	margin-top            : 40px;
`;
export const FormRow = styled.div.attrs({'data-widget': 'login-body-form-row'})`
	display                 : flex;
	align-items             : center;
	border-bottom           : var(--border);
	border-top-left-radius  : calc(var(--border-radius) * 2);
	border-top-right-radius : calc(var(--border-radius) * 2);
	&:hover {
		box-shadow       : var(--console-shadow);
		background-color : var(--invert-color);
		// for avoid chrome auto fill background
		> input {
			box-shadow : 0 0 0 1000px var(--invert-color) inset;
		}
	}
	&:focus-within {
		box-shadow       : var(--console-hover-shadow);
		background-color : var(--invert-color);
		// for avoid chrome auto fill background
		> input {
			box-shadow : 0 0 0 1000px var(--invert-color) inset;
		}
	}
`;
export const FormRowIcon = styled(FontAwesomeIcon).attrs(() => {
	return {
		'data-widget': 'login-body-form-row-icon',
		// width css cannot override selected style from original font awesome css according to css selection priority, use style attribute directly
		style: {width: 40}
	};
})`
	font-size : 1.05em;
	opacity   : 0.7;
	color     : var(--primary-color);
`;
export const FormRowInput = styled(Input).attrs({'data-widget': 'login-body-form-row-input'})`
	flex-grow     : 1;
	border        : 0;
	border-radius : 0 calc(var(--border-radius) * 2) 0 0;
	padding-left  : 0;
	transition    : none;
	// for avoid chrome auto fill background
	box-shadow    : 0 0 0 1000px var(--bg-color) inset;
	&:first-line {
		font-family : var(--title-font-family);
		font-size   : var(--font-size);
		color       : var(--font-color);
	}
`;
export const FormFooter = styled.div.attrs({'data-widget': 'login-body-form-footer'})`
	display               : grid;
	grid-template-columns : 1fr;
	padding-bottom        : var(--margin);
`;
export const Error = styled.div`
	display        : flex;
	align-items    : flex-end;
	height         : 40px;
	padding-bottom : 12px;
	font-family    : var(--title-font-family);
	color          : var(--danger-color);
	opacity        : 0.7;
	white-space    : nowrap;
	transition     : all 200ms ease-in-out;
	&:empty {
		opacity : 0;
	}
`;
export const SubmitButton = styled(LoadingButton)`
	justify-self : end;
	min-width    : 120px;
	font-weight  : var(--font-demi-bold);
`;
