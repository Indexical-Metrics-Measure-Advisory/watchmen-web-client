import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_PARAGRAPH} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../langs';
import {Dashboard} from '../../../services/tuples/dashboard-types';
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