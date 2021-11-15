import React, {useEffect, useRef, useState} from 'react';
import {ColorDropdown} from './color-dropdown';
import {ColorPickerEventBusProvider} from './color-picker-event-bus';
import {State} from './types';
import {atBottom, getPosition} from './utils';
import {ColorBar, ColorPickerContainer} from './widgets';

export const ColorPicker = (props: { color?: string, onChange: (color?: string) => void }) => {
	const {color = 'rgba(255,255,255,1)', onChange, ...rest} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<State>({
		active: false,
		atBottom: true,
		top: 0,
		left: 0,
		width: 0,
		height: 0
	});
	useEffect(() => {
		if (!state.active) {
			return;
		}
		const onScroll = () => {
			if (!state.active) {
				return;
			}
			const {top, left, width, height} = getPosition(containerRef.current!);
			const bottom = atBottom(top, height);
			setState({...state, atBottom: bottom, top, left, width, height});
		};
		window.addEventListener('scroll', onScroll, true);
		return () => {
			window.removeEventListener('scroll', onScroll, true);
		};
	}, [state]);

	const onClicked = () => {
		const {top, left, width, height} = getPosition(containerRef.current!);
		const bottom = atBottom(top, height);
		setState({active: true, atBottom: bottom, top, left, width, height});
	};
	const onBlurred = () => setState({...state, active: false});
	const onDiscard = () => setState({...state, active: false});
	const onSelected = (color?: string) => {
		setState({...state, active: false});
		onChange(color);
	};

	return <ColorPickerEventBusProvider>
		<ColorPickerContainer active={state.active}
		                      atBottom={state.atBottom}
		                      ref={containerRef}
		                      role="input" tabIndex={0}
		                      {...rest}
		                      onClick={onClicked} onBlur={onBlurred}>
			<ColorBar color={color}/>
			<ColorDropdown state={state} color={color}
			               onDiscard={onDiscard} onSelected={onSelected}/>
		</ColorPickerContainer>
	</ColorPickerEventBusProvider>;
};