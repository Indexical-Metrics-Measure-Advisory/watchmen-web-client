import {Logo} from '@/widgets/basic/logo';
import React from 'react';
import styled, {keyframes} from 'styled-components';

const Container = styled.div.attrs({'data-widget': 'simulator-loading'})`
	display               : grid;
	position              : absolute;
	grid-template-columns : 1fr;
	grid-template-rows    : 70% 30%;
	height                : 100%;
	width                 : 100%;
`;
const Spin = keyframes`
	from {
		transform : rotate(0deg);
	}
	to {
		transform : rotate(360deg);
	}
`;
const Icon = styled.div.attrs({'data-widget': 'simulator-loading-icon'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	> svg {
		height    : 70%;
		filter    : drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.7));
		animation : ${Spin} 60s linear infinite;
	}
`;
const Label = styled.div.attrs({'data-widget': 'simulator-loading-label'})`
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

export const SimulatorLoading = () => {
	return <Container>
		<Icon>
			<Logo/>
		</Icon>
		<Label>Loading Pipelines Data...</Label>
	</Container>;
};