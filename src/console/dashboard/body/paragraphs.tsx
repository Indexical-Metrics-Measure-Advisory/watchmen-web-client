import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ParagraphPanel} from '@/widgets/report/paragraph';
import React from 'react';
import {v4} from 'uuid';
import {PagePrintSize} from './page-print-size';
import {ParagraphMoveOrResizeMonitor} from './paragraph-move-or-resize-monitor';
import {ParagraphRemover} from './paragraph-remover';

export const Paragraphs = (props: {
	dashboard: Dashboard;
	transient: boolean;
	removable: boolean;
}) => {
	const {dashboard, transient, removable} = props;

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