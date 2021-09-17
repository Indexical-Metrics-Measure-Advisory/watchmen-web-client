import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL, ICON_SECONDARY_SECTION} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {SecondarySectionContainer} from './widgets';

export const SecondarySection = (props: {
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
		<SecondarySectionContainer expanded={expanded} onClick={onSectionClicked}>
			<span>
				<FontAwesomeIcon icon={ICON_SECONDARY_SECTION}/>
				{title}
			</span>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
		</SecondarySectionContainer>
		{expanded ? children : null}
	</>;
};