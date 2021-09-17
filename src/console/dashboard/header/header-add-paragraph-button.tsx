import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_PARAGRAPH} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';

export const HeaderAddParagraphButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire} = useDashboardEventBus();
	const onAddParagraphClicked = () => {
		const paragraph = {
			content: '',
			rect: {
				x: 32,
				y: 32,
				width: 400,
				height: 300
			}
		};
		if (!dashboard.paragraphs) {
			dashboard.paragraphs = [];
		}
		dashboard.paragraphs.push(paragraph);
		fire(DashboardEventTypes.PARAGRAPH_ADDED, paragraph);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_PARAGRAPH} onClick={onAddParagraphClicked}>
		<FontAwesomeIcon icon={ICON_PARAGRAPH}/>
	</PageHeaderButton>;
};