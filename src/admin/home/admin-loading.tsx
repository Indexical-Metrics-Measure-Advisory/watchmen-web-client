import {Logo} from '@/widgets/basic/logo';
import React, {ReactNode} from 'react';
import styled, {css, keyframes} from 'styled-components';

const Container = styled.div.attrs({'data-widget': 'admin-home-loading'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-template-rows    : 70% 30%;
	height                : 100vh;
	width                 : 100vw;
`;
const Spin = keyframes`
	from {
		transform : rotate(0deg);
	}
	to {
		transform : rotate(360deg);
	}
`;
const SpinSvg = css`
	animation : ${Spin} 60s linear infinite;
`;
const Icon = styled.div.attrs<{ spin: boolean }>({'data-widget': 'admin-home-loading-icon'})<{ spin: boolean }>`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	> svg {
		height : 70%;
		filter : drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.7));
		${({spin}) => spin ? SpinSvg : (void 0)};
	}
`;
const Label = styled.div.attrs({'data-widget': 'admin-home-loading-label'})`
	display       : block;
	text-align    : center;
	font-family   : var(--title-font-family);
	font-size     : 3em;
	font-variant  : petite-caps;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	opacity       : 0.7;
`;

export const AdminLoading = (props: { label?: string | ReactNode; spin?: boolean; children?: ReactNode }) => {
	const {label, spin = true, children} = props;
	return <Container>
		<Icon spin={spin}>
			{children ?? <Logo/>}
		</Icon>
		<Label>{label}</Label>
	</Container>;
};