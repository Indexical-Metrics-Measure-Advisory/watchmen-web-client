import React, {useRef} from 'react';
import styled from 'styled-components';
import {BASE_COLORS_24} from './colors';
import {useTooltip} from './tooltip';

const AvatarContainer = styled.div.attrs<{ color: string }>(({color}) => {
	return {
		'data-widget': 'avatar',
		style: {
			backgroundColor: color
		}
	};
})<{ color: string }>`
	display          : flex;
	align-items      : center;
	justify-content  : center;
	font-size        : 1.3em;
	font-family      : var(--title-font-family);
	font-weight      : var(--font-bold);
	font-variant     : petite-caps;
	width            : var(--avatar-size);
	height           : var(--avatar-size);
	border-radius    : 100%;
	color            : var(--invert-color);
	user-select      : none;
	transform        : scale(0.9);
	transform-origin : center;
`;
const FirstChar = styled.span.attrs<{ singleCharacter: boolean }>(({singleCharacter}) => {
	return {
		'data-widget': 'avatar-first-char',
		style: {
			transform: singleCharacter ? (void 0) : 'translate(1px, -1px)'
		}
	};
})<{ singleCharacter: boolean }>`
	z-index : 1;
`;
const SecondChar = styled.span.attrs({'data-widget': 'avatar-second-char'})`
	z-index   : 0;
	opacity   : 0.7;
	transform : translate(-1px, -1px);
`;

export const Avatar = (props: { name: string, showTooltip?: boolean }) => {
	const {name, showTooltip = false, ...rest} = props;

	const containerRef = useRef<HTMLDivElement>(null);

	const tooltip = useTooltip<HTMLDivElement>({
		use: showTooltip,
		tooltip: name,
		target: containerRef
	});

	let first = 'X';
	let second = '';
	const names = (name || '').split(/[\s.-]/);
	if (names.length !== 0) {
		first = ((names[0] || '')[0] || 'X').toUpperCase();
		if (names.length > 1) {
			second = ((names[names.length - 1] || '')[0] || '').toUpperCase();
		}
	}

	const color = BASE_COLORS_24[(first.charCodeAt(0) + (second || ' ').charCodeAt(0)) % BASE_COLORS_24.length];

	return <AvatarContainer {...rest} color={color} {...tooltip} ref={containerRef}>
		<FirstChar singleCharacter={!second}>{first}</FirstChar>
		<SecondChar>{second}</SecondChar>
	</AvatarContainer>;
};