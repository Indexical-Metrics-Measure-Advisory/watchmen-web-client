import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '../../../../../basic-widgets/constants';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {SectionContainer} from './widgets';

export const Section = (props: {
	title: string;
	children: ((props: any) => React.ReactNode) | React.ReactNode
}) => {
	const {title, children} = props;

	const {on, off} = useReportEditEventBus();
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		const onExpand = () => setExpanded(true);
		const onCollapse = () => setExpanded(false);
		on(ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, onCollapse);
		on(ReportEditEventTypes.EXPAND_ALL_SECTIONS, onExpand);
		return () => {
			off(ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, onCollapse);
			off(ReportEditEventTypes.EXPAND_ALL_SECTIONS, onExpand);
		};
	}, [on, off]);

	const onSectionClicked = () => {
		setExpanded(!expanded);
	};

	return <>
		<SectionContainer expanded={expanded} onClick={onSectionClicked}>
			<span>{title}</span>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
		</SectionContainer>
		{expanded ? children : null}
	</>;
};