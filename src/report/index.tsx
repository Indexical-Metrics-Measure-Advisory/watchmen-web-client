import React from 'react';
import { Report } from '../services/tuples/report-types';
import { Container } from './container';

// const Header = styled.div.attrs({
// 	'data-widget': 'console-subject-view-chart-header'
// })`
// 	display       : flex;
// 	align-items   : center;
// 	font-variant  : petite-caps;
// 	font-size     : 0.8em;
// 	font-weight   : var(--font-demi-bold);
// 	height        : 40px;
// 	margin        : 3px 3px 0;
// 	padding       : 0 calc(var(--margin) / 2);
// 	border-bottom : var(--border);
// 	cursor        : move;
// 	&[data-locked=true] {
// 		cursor : default;
// 	}
// 	> span:first-child {
// 		flex-grow : 1;
// 	}
// `;
// const HeaderButtons = styled.div.attrs({
// 	'data-widget': 'console-subject-view-chart-header-buttons'
// })`
// 	display      : flex;
// 	align-items  : center;
// 	margin-right : calc(var(--margin) / -4);
// 	&[data-visible=false] {
// 		> button:not(:first-child) {
// 			display : none;
// 		}
// 	}
// 	&[data-expanded=true] {
// 		> button:first-child > svg {
// 			transform : rotateZ(180deg);
// 		}
// 	}
// 	> button {
// 		height : 32px;
// 		width  : 32px;
// 		&:first-child > svg {
// 			transition : transform 300ms ease-in-out;
// 		}
// 		> svg {
// 			font-size : 0.8em;
// 		}
// 	}
// `;
// const Body = styled.div.attrs({
// 	'data-widget': 'console-subject-view-chart-body'
// })`
// 	flex-grow : 1;
// 	position  : relative;
// 	margin    : 0 3px 3px;
// `;

export const Chart = (props: { report: Report }) => {
	const { report } = props;
	// lock me when one of relative or locked is true
	// const locked = props.relative || props.locked;

	// const dialog = useDialog();
	// const { save: saveSubject } = useSubjectContext();
	// const chartRef = useRef<HTMLDivElement>(null);
	// const headerRef = useRef<HTMLDivElement>(null);
	// const headerButtonsRef = useRef<HTMLDivElement>(null);
	// const [ max, setMax ] = useState(false);
	// const [ settingsVisible, setSettingsVisible ] = useState(false);
	// const forceUpdate = useForceUpdate();
	// useEffect(() => {
	// 	// initialize rect, defensive
	// 	if (chart.rect) {
	// 		return;
	// 	}
	// 	chart.rect = generateChartRect(containerRef.current!);
	// 	forceUpdate();
	// });
	// useEffect(() => {
	// 	// @ts-ignore
	// 	const resizeObserver = new ResizeObserver(() => {
	// 		if (!containerRef.current || !chartRef.current || !max) {
	// 			return;
	// 		}
	// 		const chartContainer = chartRef.current;
	// 		const {
	// 			top: currentTop,
	// 			left: currentLeft,
	// 			width: currentWidth,
	// 			height: currentHeight
	// 		} = chartContainer.getBoundingClientRect();
	// 		const { top, left, width, height } = maxChart();
	// 		// console.log(top, left, width, height);
	// 		// console.log(currentTop, currentLeft, currentWidth, currentHeight);
	// 		if (top === currentTop && left === currentLeft && width === currentWidth && height === currentHeight) {
	// 			return;
	// 		}
	// 		forceUpdate();
	// 	});
	// 	resizeObserver.observe(containerRef.current);
	// 	return () => resizeObserver.disconnect();
	// });

	// if (!chart.rect) {
	// 	return null;
	// }
	//
	// const maxChart = () => {
	// 	const { top, left } = containerRef.current!.getBoundingClientRect();
	// 	const { offsetWidth, offsetHeight } = containerRef.current!;
	// 	return {
	// 		top: top - 1,
	// 		left: left - 1,
	// 		width: offsetWidth + 2,
	// 		height: offsetHeight + 2
	// 	};
	// };

	// const onToggleMaxClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	setMax(!max);
	// };
	// const onOpenSettingsClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	setSettingsVisible(true);
	// };
	// const onCloseSettings = async () => {
	// 	await saveSubject(true);
	// 	setSettingsVisible(false);
	// };
	// const onDeleteConfirmClicked = () => {
	// 	onDeleteChart(chart);
	// 	dialog.hide();
	// };
	// const onDeleteClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	dialog.show(
	// 		<div data-widget='dialog-console-delete'>
	// 			<span>Are you sure to delete this chart?</span>
	// 		</div>,
	// 		<Fragment>
	// 			<div style={{ flexGrow: 1 }}/>
	// 			<Button inkType={ButtonType.PRIMARY} onClick={onDeleteConfirmClicked}>Yes</Button>
	// 			<Button inkType={ButtonType.DEFAULT} onClick={dialog.hide}>Cancel</Button>
	// 		</Fragment>
	// 	);
	// };

	// const rect = max ? maxChart() : chart.rect;

	return <Container report={report}>
		{/*<Header data-position={DragType.DND} data-locked={locked} ref={headerRef}>*/}
		{/*	<span>{chart.name || 'Noname'}</span>*/}
		{/*	<HeaderButtons data-visible={!locked} data-expanded={max} ref={headerButtonsRef}>*/}
		{/*		<LinkButton ignoreHorizontalPadding={true} tooltip={max ? 'Minimize' : 'Maximize'} center={true}*/}
		{/*		            onClick={onToggleMaxClicked}>*/}
		{/*			<FontAwesomeIcon icon={max ? faCompressArrowsAlt : faExpandArrowsAlt}/>*/}
		{/*		</LinkButton>*/}
		{/*		{settings*/}
		{/*			? <LinkButton ignoreHorizontalPadding={true} tooltip='Open Settings' center={true}*/}
		{/*			              onClick={onOpenSettingsClicked}>*/}
		{/*				<FontAwesomeIcon icon={faCog}/>*/}
		{/*			</LinkButton>*/}
		{/*			: null}*/}
		{/*		<LinkButton ignoreHorizontalPadding={true} tooltip='Delete Chart' center={true}*/}
		{/*		            onClick={onDeleteClicked}>*/}
		{/*			<FontAwesomeIcon icon={faTimes}/>*/}
		{/*		</LinkButton>*/}
		{/*	</HeaderButtons>*/}
		{/*</Header>*/}
		{/*<Body>*/}
		{/*	<ChartDiagram space={space} subject={subject} chart={chart} visible={!settingsVisible}/>*/}
		{/*	<ChartSettingsPanel space={space} subject={subject} chart={chart} visible={!locked && settingsVisible}*/}
		{/*	                    closeSettings={onCloseSettings}/>*/}
		{/*</Body>*/}
	</Container>;
};