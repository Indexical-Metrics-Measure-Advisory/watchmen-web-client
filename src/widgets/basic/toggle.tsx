import React, {MouseEvent, useRef} from 'react';
import styled from 'styled-components';

const ToggleButton = styled.div.attrs({'data-widget': 'toggle'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	width         : calc((var(--toggle-height) - 4px) * 2);
	height        : var(--toggle-height);
	border-radius : calc(var(--toggle-height) / 2);
	cursor        : pointer;
	transition    : all 300ms ease-in-out;
	&[data-positive=true] {
		background-color : var(--toggle-positive-bg-color);
	}
	&[data-positive=false] {
		background-color : var(--toggle-negative-bg-color);
	}
`;
const Slider = styled.div.attrs({'data-widget': 'toggle-slider'})`
	display       : block;
	position      : relative;
	width         : calc(var(--toggle-height) - 4px);
	height        : calc(var(--toggle-height) - 4px);
	border-radius : calc((var(--toggle-height) - 4px) / 2);
	transition    : all 300ms ease-in-out;
	&[data-positive=true] {
		margin-left      : calc(100% - (var(--toggle-height) - 4px) - 2px);
		background-color : var(--toggle-positive-slider-color);
	}
	&[data-positive=false] {
		margin-left      : 2px;
		background-color : var(--toggle-negative-slider-color);
	}
`;

export const Toggle = (props: {
	value: boolean;
	onChange: (value: boolean) => void;
}) => {
	const {value, onChange, ...rest} = props;

	const toggleRef = useRef<HTMLDivElement>(null);

	const onToggleClicked = (event: MouseEvent<HTMLDivElement>) => {
		const {clientX} = event;
		const {left, width} = toggleRef.current!.getBoundingClientRect();
		if (clientX - left > width / 2) {
			// toggle to true
			if (!value) {
				onChange(true);
			}
		} else if (value) {
			// toggle to false
			onChange(false);
		}
	};

	return <ToggleButton data-positive={value} onClick={onToggleClicked}
	                     {...rest}
	                     ref={toggleRef}>
		<Slider data-positive={value}/>
	</ToggleButton>;
};