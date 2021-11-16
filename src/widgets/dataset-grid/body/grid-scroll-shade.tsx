import React, {RefObject, useEffect, useRef} from 'react';
import {
	GridBottomLeftPaster,
	GridBottomRightPaster,
	GridScrollHorizontalShade,
	GridScrollVerticalShade
} from './scroll-shade-widgets';

export const GridScrollShade = (props: {
	wrapperRef: RefObject<HTMLDivElement>;
	dataTableRef: RefObject<HTMLDivElement>;
	visible: boolean;
}) => {
	const {wrapperRef, dataTableRef, visible} = props;

	const wrapper = wrapperRef.current;
	const dataTable = dataTableRef.current;

	const verticalScrollRef = useRef<HTMLDivElement>(null);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!visible || !dataTable || !verticalScrollRef.current || !horizontalScrollRef.current) {
			return;
		}
		const {scrollTop, scrollLeft} = dataTable;
		verticalScrollRef.current.scrollTop = scrollTop;
		horizontalScrollRef.current.scrollLeft = scrollLeft;
		// do not use dependencies here
	});

	if (!wrapper || !dataTable) {
		return null;
	}

	const {left: wrapperLeft} = wrapper.getBoundingClientRect();
	const {clientWidth, clientHeight, scrollWidth, scrollHeight, offsetWidth, offsetHeight} = dataTable;
	const {left: horizontalScrollLeft} = dataTable.getBoundingClientRect();

	return <>
		<GridScrollVerticalShade width={offsetWidth - clientWidth}
		                         heightOffset={offsetHeight - clientHeight}
		                         visible={visible}
		                         ref={verticalScrollRef}>
			<div style={{width: 1, height: scrollHeight}}/>
		</GridScrollVerticalShade>
		<GridScrollHorizontalShade left={horizontalScrollLeft - wrapperLeft} height={offsetHeight - clientHeight}
		                           widthOffset={offsetWidth - clientWidth}
		                           visible={visible}
		                           ref={horizontalScrollRef}>
			<div style={{width: scrollWidth, height: 1}}/>
		</GridScrollHorizontalShade>
		<GridBottomLeftPaster width={horizontalScrollLeft - wrapperLeft} height={offsetHeight - clientHeight}
		                      visible={visible}/>
		<GridBottomRightPaster width={offsetWidth - clientWidth} height={offsetHeight - clientHeight}
		                       visible={visible}/>
	</>;
};