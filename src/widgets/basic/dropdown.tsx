import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {getLangLabel} from '../langs';
import {BASE_HEIGHT, DROPDOWN_Z_INDEX, ICON_DROPDOWN} from './constants';
import {DropdownOption, DropdownOptionLabel, DropdownProps} from './types';
import {useCollapseFixedThing} from './utils';

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

const isJSXElement = (label: any): label is JSX.Element => {
	return !!(label as any).$$typeof;
};

const DropdownContainer = styled.div.attrs<{ 'data-widget'?: string, active: boolean, atBottom: boolean }>(
	({'data-widget': widget, active, atBottom}) => {
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
const Label = styled.span.attrs({'data-widget': 'dropdown-label'})`
	flex-grow     : 1;
	display       : flex;
	align-items   : center;
	height        : 100%;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow-x    : hidden;
	&[data-please=true] {
		opacity : 0.7;
	}
`;
const Caret = styled(FontAwesomeIcon).attrs({'data-widget': 'dropdown-caret'})`
	opacity     : 0;
	margin-left : calc(var(--margin) / 4);
	transition  : all 300ms ease-in-out;
`;
const Options = styled.div.attrs<State>(
	({active, atBottom, top, left, height, minWidth}) => {
		return {
			'data-widget': 'dropdown-options-container',
			'data-v-scroll': '',
			style: {
				opacity: active ? 1 : (void 0),
				pointerEvents: active ? 'auto' : (void 0),
				top: atBottom ? (top + height) : (void 0),
				bottom: atBottom ? (void 0) : `calc(100vh - ${top}px)`,
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
const OptionFilter = styled.div.attrs<State>(({active, atBottom, top, left, height}) => {
	return {
		'data-widget': 'dropdown-option-filter',
		style: {
			opacity: active ? 1 : 0,
			top: atBottom ? (top + height - 10) : (void 0),
			bottom: atBottom ? (void 0) : `calc(100vh - ${top}px - 10px)`,
			left: left - 10
		}
	};
})<State>`
	display        : flex;
	align-items    : center;
	position       : fixed;
	line-height    : 20px;
	height         : 20px;
	padding        : 0 var(--input-indent);
	border-radius  : var(--border-radius);
	overflow       : hidden;
	white-space    : nowrap;
	text-overflow  : ellipsis;
	pointer-events : none;
	z-index        : ${DROPDOWN_Z_INDEX + 1};
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--warn-color);
		border-radius    : var(--border-radius);
		opacity          : 0.7;
		z-index          : -1;
	}
	> span:first-child {
		font-weight  : var(--font-demi-bold);
		margin-right : 4px;
	}
	> input {
		border           : 0;
		outline          : none;
		background-color : transparent;
		color            : var(--font-color);
		caret-color      : transparent;
		caret-shape      : revert;
	}
`;
const Option = styled.span.attrs({'data-widget': 'dropdown-option'})`
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
	return {top: rect.top, left: rect.left, width: rect.width, height: rect.height};
};

export const Dropdown = (props: DropdownProps) => {
	const {options = [], onChange, value, please = '', display, ...rest} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const filterInputRef = useRef<HTMLInputElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<State>({
		active: false,
		atBottom: true,
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		minWidth: 0
	});
	const [filter, setFilter] = useState('');

	useEffect(() => {
		if (!state.active) {
			return;
		}
		const onScroll = (event: Event) => {
			if (!state.active || event.target === optionsRef.current) {
				return;
			}
			const {top, left, width, height} = getPosition(containerRef.current!);
			const bottom = atBottom(top, height, options.length);
			setState({...state, atBottom: bottom, top, left, width, height, minWidth: width});
		};
		window.addEventListener('scroll', onScroll, true);
		return () => {
			window.removeEventListener('scroll', onScroll, true);
		};
	}, [state, options.length]);
	useCollapseFixedThing({
		containerRef, visible: state.active, hide: () => {
			setState({...state, active: false});
			setTimeout(() => setFilter(''), 300);
		}
	});

	const onClicked = () => {
		const {top, left, width, height} = getPosition(containerRef.current!);
		const bottom = atBottom(top, height, options.length);
		setState({active: true, atBottom: bottom, top, left, width, height, minWidth: width});
	};
	const onFocused = () => {
		filterInputRef.current?.focus();
	};
	const onKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
		if (!state.active) {
			return;
		}
		const {key} = event;
		if (key === 'Escape') {
			setFilter('');
		}
	};
	const onFilterChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	};
	const onOptionClicked = (option: DropdownOption) => (event: MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const ret = onChange(option);
		if (!ret) {
			setState({...state, active: false});
			if (filter !== '') {
				setTimeout(() => setFilter(''), 300);
			}
		} else {
			setState({...state, active: ret.active});
			if (!ret.active && filter !== '') {
				setTimeout(() => setFilter(''), 300);
			}
		}
	};

	const asLabel = (option: DropdownOption) => {
		const {label} = option;
		if (typeof label === 'string') {
			return label;
		} else if (isJSXElement(label)) {
			return label;
		} else {
			const display: DropdownOptionLabel = label(option) || '';
			// don't know why, webstorm consider "display" cannot have type "string",
			// but obviously it has
			// noinspection SuspiciousTypeOfGuard
			if (typeof display === 'string') {
				return display;
			} else {
				return display.node;
			}
		}
	};
	let label;
	let selection = null;
	if (display != null) {
		label = display();
		selection = false;
	} else if (value == null) {
		label = please;
	} else {
		// eslint-disable-next-line
		selection = options.find(option => option.value == value);
		label = selection ? asLabel(selection) : please;
	}
	const directFromLabel = (option: DropdownOption): DropdownOptionLabel => {
		return {
			node: option.label,
			label: option.label as string
		};
	};

	return <DropdownContainer active={state.active}
	                          atBottom={state.atBottom}
	                          ref={containerRef}
	                          role="input" tabIndex={0}
	                          {...rest}
	                          onFocus={onFocused}
	                          onClick={onClicked}>
		<Label data-please={!selection}>{label}</Label>
		<Caret icon={ICON_DROPDOWN}/>
		<Options {...state} ref={optionsRef}>
			<OptionFilter {...{...state, active: !!filter}}>
				<span>?:</span>
				<input value={filter} onChange={onFilterChanged}
				       onKeyUp={onKeyUp}
				       ref={filterInputRef}/>
			</OptionFilter>
			{options.map(option => {
				const {label, key} = option;
				const asLabel = typeof label === 'function' ? label : directFromLabel;
				const computed = asLabel(option);
				const display = typeof computed === 'string' ? computed : computed.node;
				let compare;
				if (isJSXElement(display) && display.props.labelKey != null) {
					// it is a i18n string, is delegated and now it is a JSX element
					compare = getLangLabel(display.props.labelKey);
				} else {
					// label still might be a JSX element, because of i18n delegate logic
					// in case of this, this option will be filtered no matter what filter text is given
					compare = typeof computed === 'string' ? computed : (typeof computed.label === 'string' ? computed.label : '');
				}
				if (filter && compare.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
					return null;
				}

				const asKey = typeof key === 'function' ? key : (() => key != null ? key : option.value);
				return <Option key={`${asKey(option)}`} onClick={onOptionClicked(option)}>
					{display}
				</Option>;
			})}
		</Options>
	</DropdownContainer>;
};
