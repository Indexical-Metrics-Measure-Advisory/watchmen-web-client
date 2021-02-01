import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BASE_HEIGHT, DROPDOWN_Z_INDEX } from './constants';
import { DropdownOption, DropdownProps } from './types';

interface State {
	active: boolean;
	atBottom: boolean;
	top: number;
	left: number;
	width: number;
	height: number;
	minWidth: number;
}

const atBottom = (top: number, height: number, itemCount: number) => {
	return top + height + Math.min(itemCount, 8) * BASE_HEIGHT + 2 < window.innerHeight;
};

const DropdownContainer = styled.div.attrs<{ 'data-widget'?: string, active: boolean, atBottom: boolean }>(
	({ 'data-widget': widget, active, atBottom }) => {
		return {
			'data-widget': widget || 'dropdown',
			style: {
				borderTopLeftRadius: (active && !atBottom) ? 0 : (void 0),
				borderTopRightRadius: (active && !atBottom) ? 0 : (void 0),
				borderBottomLeftRadius: (active && atBottom) ? 0 : (void 0),
				borderBottomRightRadius: (active && atBottom) ? 0 : (void 0)
			}
		};
	})<{ active: boolean, atBottom: boolean }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	padding          : 0 var(--input-indent);
	outline          : none;
	appearance       : none;
	border           : var(--border);
	border-radius    : var(--border-radius);
	height           : var(--height);
	background-color : transparent;
	transition       : all 300ms ease-in-out;
	cursor           : pointer;
	width            : 100%;
	&:hover,
	&:focus {
		> svg {
			opacity : 1;
		}
	}
`;
const Label = styled.span.attrs({ 'data-widget': 'dropdown-label' })`
	flex-grow     : 1;
	display       : flex;
	align-items   : center;
	height        : 100%;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow-x    : hidden;
`;
const Caret = styled(FontAwesomeIcon).attrs({ 'data-widget': 'dropdown-caret' })`
	opacity     : 0;
	margin-left : var(--letter-gap);
	transition  : all 300ms ease-in-out;
`;
const Options = styled.div.attrs<State>(
	({ active, atBottom, top, left, height, minWidth }) => {
		return {
			'data-widget': 'dropdown-options-container',
			style: {
				opacity: active ? 1 : (void 0),
				pointerEvents: active ? 'auto' : (void 0),
				top: atBottom ? (top + height - 1) : (void 0),
				bottom: atBottom ? (void 0) : `calc(100vh - ${top + 1}px)`,
				left,
				minWidth,
				borderTopLeftRadius: atBottom ? 0 : 'var(--border-radius)',
				borderTopRightRadius: atBottom ? 0 : 'var(--border-radius)',
				borderBottomLeftRadius: atBottom ? 'var(--border-radius)' : 0,
				borderBottomRightRadius: atBottom ? 'var(--border-radius)' : 0
			}
		};
	})<State>`
	position         : fixed;
	max-height       : calc(var(--height) * 8 + 2px);
	background-color : var(--bg-color);
	border           : var(--border);
	transition       : opacity 300ms ease-in-out;
	z-index          : ${DROPDOWN_Z_INDEX};
	overflow-y       : auto;
	opacity          : 0;
	pointer-events   : none;
`;
const Option = styled.span.attrs({ 'data-widget': 'dropdown-option' })`
	display       : flex;
	align-items   : center;
	padding       : 0 var(--input-indent);
	height        : var(--height);
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
	&:hover {
		background-color : var(--hover-color);
	}
`;

const getPosition = (container: HTMLDivElement) => {
	const rect = container.getBoundingClientRect();
	return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
};

export const Dropdown = (props: DropdownProps) => {
	const { options = [], onChange, value, please = '', ...rest } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [ state, setState ] = useState<State>({
		active: false,
		atBottom: true,
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		minWidth: 0
	});

	useEffect(() => {
		const onScroll = () => {
			if (!state.active) {
				return;
			}
			const { top, left, width, height } = getPosition(containerRef.current!);
			const bottom = atBottom(top, height, options.length);
			setState({ ...state, atBottom: bottom, top, left, width, height, minWidth: width });
		};
		window.addEventListener('scroll', onScroll, true);
		return () => {
			window.removeEventListener('scroll', onScroll, true);
		};
		// listen scroll anyway
		// eslint-disable-next-line
	}, []);

	const onClicked = () => {
		const { top, left, width, height } = getPosition(containerRef.current!);
		const bottom = atBottom(top, height, options.length);
		setState({ active: true, atBottom: bottom, top, left, width, height, minWidth: width });
	};
	const onBlurred = () => setState({ ...state, active: false });
	const onOptionClicked = (option: DropdownOption) => (event: MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const ret = onChange(option);
		if (!ret) {
			setState({ ...state, active: false });
		} else {
			setState({ ...state, active: ret.active });
		}
	};

	const asLabel = (option: DropdownOption) => {
		const { label } = option;
		if (typeof label === 'string') {
			return label;
		} else {
			return label(option);
		}
	};
	let label;
	if (value == null) {
		label = please;
	} else {
		const selection = options.find(option => option.value === value);
		label = selection ? asLabel(selection) : please;
	}

	return <DropdownContainer {...rest}
	                          active={state.active}
	                          atBottom={state.atBottom}
	                          ref={containerRef}
	                          role='input' tabIndex={0}
	                          onClick={onClicked} onBlur={onBlurred}>
		<Label>{label}</Label>
		<Caret icon={faCaretDown}/>
		<Options {...state}>
			{options.map(option => {
				return <Option key={`${option.value}`} onClick={onOptionClicked(option)}>
					{asLabel(option)}
				</Option>;
			})}
		</Options>
	</DropdownContainer>;
};
