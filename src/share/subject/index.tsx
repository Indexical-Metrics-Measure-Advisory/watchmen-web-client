import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubjectReports } from '../../console/connected-space/subject-view/report';
import { SubjectEventBusProvider } from '../../console/connected-space/subject-view/subject-event-bus';
import { ConsoleEventBusProvider } from '../../console/console-event-bus';
import { Lang } from '../../langs';
import { fetchSharedSubject } from '../../services/share/subject';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { Subject } from '../../services/tuples/subject-types';
import { getCurrentTime } from '../../services/utils';
import { ShareNothing } from '../share-nothing';
import { ShareSubjectContainer } from './widgets';

interface ShareSubjectState {
	initialized: boolean;
	subject?: Subject;
}

const ShareSubject = (props: { subject: Subject }) => {
	const { subject } = props;

	const connectedSpace: ConnectedSpace = {
		connectId: '',
		name: '',
		spaceId: '',
		subjects: [ subject ],
		lastVisitTime: getCurrentTime(),
		lastModifyTime: getCurrentTime(),
		createTime: getCurrentTime()
	};
	return <SubjectEventBusProvider>
		<ShareSubjectContainer>
			<SubjectReports connectedSpace={connectedSpace} subject={subject}
			                editable={false} removable={false}/>
		</ShareSubjectContainer>
	</SubjectEventBusProvider>;
};

const ShareSubjectIndex = () => {
		const { subjectId, token } = useParams<{ subjectId: string, token: string }>();

		const [ state, setState ] = useState<ShareSubjectState>({ initialized: false });
		useEffect(() => {
			(async () => {
				try {
					const { subject } = await fetchSharedSubject(subjectId, token);
					setState({ initialized: true, subject });
				} catch (e) {
					console.error(e);
					setState({ initialized: true });
				}
			})();
		}, [ subjectId ]);

		if (!state.initialized) {
			return <ShareNothing label={Lang.CONSOLE.LOADING}/>;
		}

		if (state.initialized && state.subject == null) {
			return <ShareNothing label={Lang.CONSOLE.ERROR.SUBJECT_NOT_FOUND}/>;
		}

		return <ConsoleEventBusProvider>
			{/*<SimulateConsole reports={state.reports!}/>*/}
			<ShareSubject subject={state.subject!}/>
		</ConsoleEventBusProvider>;
	}
;

export default ShareSubjectIndex;