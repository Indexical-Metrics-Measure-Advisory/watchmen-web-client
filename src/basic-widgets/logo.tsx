import React from 'react';
import styled from 'styled-components';
import {LogoProps} from './types';

const SVG = styled.svg.attrs<{ 'data-widget'?: string }>(({'data-widget': widget}) => {
	return {'data-widget': widget || 'logo'};
})`
	> g {
		> ellipse {
			fill   : var(--primary-color);
			stroke : var(--primary-color);
		}
		> path {
			stroke : var(--invert-color);
		}
	}
`;

export const Logo = (props: LogoProps) => {
	return <SVG xmlns="http://www.w3.org/2000/svg" version="1.1" width="541px" height="558px"
	            viewBox="-0.5 -0.5 541 558"
	            {...props}>
		<defs/>
		<g>
			<ellipse cx="265" cy="265" rx="265" ry="265" pointerEvents="none"/>
			<path d="M 64.8 508.8 Q 453.6 402.8 280.8 318 Q 108 233.2 300.05 149.43" fill="none"
			      strokeWidth="96" strokeMiterlimit="10" pointerEvents="none"/>
			<path d="M 321.02 199.19 L 398.42 106.51 L 277.84 100.2" fill="none" strokeWidth="96"
			      strokeMiterlimit="10" pointerEvents="none"/>
		</g>
	</SVG>;
};