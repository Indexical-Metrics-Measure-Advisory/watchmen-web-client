import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {ICON_AUTO_REFRESH} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {REPORT_AUTO_REFRESH_INTERVAL} from '../../constants';
import {useSubjectEventBus} from '../subject-event-bus';
import {SubjectEventTypes} from '../subject-event-bus-types';

export const HeaderAutoRefreshButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;

	const {fire} = useSubjectEventBus();

	const isAutoRefresh = (subject.autoRefreshInterval || 0) !== 0;
	const [timer, setTimer] = useState<number | null>(() => {
		if (isAutoRefresh) {
			return window.setInterval(() => {
				fire(SubjectEventTypes.REFRESH_REPORTS, subject);
			}, subject.autoRefreshInterval!);
		} else {
			return null;
		}
	});
	const forceUpdate = useForceUpdate();

	const onAutoRefreshClicked = () => {
		if (!isAutoRefresh) {
			subject.autoRefreshInterval = REPORT_AUTO_REFRESH_INTERVAL;
			fire(SubjectEventTypes.SUBJECT_DEF_CHANGED, subject);
			fire(SubjectEventTypes.REFRESH_REPORTS, subject);
			setTimer(window.setInterval(() => {
				fire(SubjectEventTypes.REFRESH_REPORTS, subject);
			}, subject.autoRefreshInterval!));
		} else {
			delete subject.autoRefreshInterval;
			fire(SubjectEventTypes.SUBJECT_DEF_CHANGED, subject);
			if (timer) {
				window.clearTimeout(timer);
			}
			setTimer(null);
		}
		forceUpdate();
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.AUTO_REFRESH}
	                         ink={isAutoRefresh ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onAutoRefreshClicked}>
		<FontAwesomeIcon icon={ICON_AUTO_REFRESH}/>
	</PageHeaderButton>;
};