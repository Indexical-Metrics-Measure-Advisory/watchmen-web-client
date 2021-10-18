import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {ParagraphPanel} from '@/widgets/report/paragraph';
import React, {useEffect} from 'react';
import {v4} from 'uuid';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';
import {PagePrintSize} from './page-print-size';
import {ParagraphMoveOrResizeMonitor} from './paragraph-move-or-resize-monitor';
import {ParagraphRemover} from './paragraph-remover';

export const Paragraphs = (props: {
	dashboard: Dashboard;
	transient: boolean;
	removable: boolean;
}) => {
	const {dashboard, transient, removable} = props;

	const {on, off, fire} = useDashboardEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onParagraphChanged = () => {
			fire(DashboardEventTypes.SAVE_DASHBOARD, dashboard);
		};
		on(DashboardEventTypes.PARAGRAPH_ADDED, onParagraphChanged);
		on(DashboardEventTypes.PARAGRAPH_REMOVED, onParagraphChanged);
		return () => {
			off(DashboardEventTypes.PARAGRAPH_ADDED, onParagraphChanged);
			off(DashboardEventTypes.PARAGRAPH_REMOVED, onParagraphChanged);
		};
	}, [on, off, fire, forceUpdate, dashboard]);

	const paragraphs = dashboard.paragraphs || [];

	return <>
		{paragraphs.length !== 0
			? paragraphs.map(paragraph => {
				return <ParagraphPanel paragraph={paragraph} fixed={false}
				                       editable={true}
				                       removable={removable}
				                       key={v4()}/>;
			})
			: null}
		<PagePrintSize dashboard={dashboard}/>
		{transient ? null : <ParagraphMoveOrResizeMonitor dashboard={dashboard}/>}
		<ParagraphRemover dashboard={dashboard}/>
	</>;
};