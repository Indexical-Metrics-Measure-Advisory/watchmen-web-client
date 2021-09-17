import {toSubject, toSubjectReport} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_CLOSE, ICON_EDIT} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {ReportBody} from './report-body';
import {SubjectBody} from './subject-body';
import {TopicBody} from './topic-body';
import {NavigatorContainer, NavigatorHeader, NavigatorHeaderButton, NavigatorHeaderTitle} from './widgets';

export const Navigator = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const history = useHistory();
	const {on, off} = useCatalogEventBus();
	const [visible, setVisible] = useState(false);
	const [tuples, setTuples] = useState<{ topic?: Topic, subject?: Subject, report?: Report }>({});
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setTuples({topic});
			setVisible(true);
		};
		const onSubjectSelected = (subject: Subject) => {
			setTuples({subject});
			setVisible(true);
		};
		const onReportSelected = (subject: Subject, report: Report) => {
			setTuples({subject, report});
			setVisible(true);
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		on(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
		on(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
			off(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
			off(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
		};
	}, [on, off]);

	const onOpenSubjectClicked = () => {
		if (tuples && tuples.subject) {
			history.push(toSubject(connectedSpace.connectId, tuples.subject.subjectId));
		}
	};
	const onOpenReportClicked = () => {
		if (tuples && tuples.subject && tuples.report) {
			history.push(toSubjectReport(connectedSpace.connectId, tuples.subject.subjectId, tuples.report.reportId));
		}
	};
	const onCloseClicked = () => {
		setVisible(false);
	};

	let name = '';
	if (tuples == null) {
	} else if (tuples.topic) {
		name = tuples.topic.name;
	} else if (tuples.report) {
		name = tuples.report.name;
	} else if (tuples.subject) {
		name = tuples.subject.name;
	}

	return <NavigatorContainer visible={visible}>
		<NavigatorHeader>
			<NavigatorHeaderTitle>{name}</NavigatorHeaderTitle>
			{tuples != null && tuples.subject && !tuples.report
				? <NavigatorHeaderButton
					tooltip={{
						label: Lang.CONSOLE.CONNECTED_SPACE.OPEN_SUBJECT,
						alignment: TooltipAlignment.RIGHT,
						offsetX: 4
					}}
					onClick={onOpenSubjectClicked}>
					<FontAwesomeIcon icon={ICON_EDIT}/>
				</NavigatorHeaderButton>
				: null}
			{tuples != null && tuples.report
				? <NavigatorHeaderButton
					tooltip={{
						label: Lang.CONSOLE.CONNECTED_SPACE.OPEN_REPORT,
						alignment: TooltipAlignment.RIGHT,
						offsetX: 4
					}}
					onClick={onOpenReportClicked}>
					<FontAwesomeIcon icon={ICON_EDIT}/>
				</NavigatorHeaderButton>
				: null}
			<NavigatorHeaderButton
				tooltip={{label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT, offsetX: 4}}
				onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</NavigatorHeaderButton>
		</NavigatorHeader>
		{tuples != null && tuples.topic
			? <TopicBody topic={tuples.topic}/>
			: null}
		{tuples != null && tuples.subject && !tuples.report
			? <SubjectBody connectedSpace={connectedSpace} subject={tuples.subject}/>
			: null}
		{tuples != null && tuples.report
			? <ReportBody report={tuples.report}/>
			: null}
	</NavigatorContainer>;
};