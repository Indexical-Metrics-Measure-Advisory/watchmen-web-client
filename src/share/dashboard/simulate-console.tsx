import {useEffect} from 'react';
import {useConsoleEventBus} from '../../console/console-event-bus';
import {ConsoleEventTypes} from '../../console/console-event-bus-types';
import {ConnectedSpace} from '../../services/tuples/connected-space-types';
import {ParameterJointType} from '../../services/tuples/factor-calculator-types';
import {Report} from '../../services/tuples/report-types';
import {getCurrentTime} from '../../services/utils';

export const SimulateConsole = (props: { reports: Array<Report> }) => {
	const {reports} = props;

	const {on, off, fire} = useConsoleEventBus();
	useEffect(() => {
		const onAskConnectedSpaces = () => {
			// just fake a connected space to include all reports
			fire(ConsoleEventTypes.REPLY_CONNECTED_SPACES, [
				{
					connectId: '',
					name: '',
					spaceId: '',
					subjects: [{
						subjectId: '',
						name: '',
						reports,
						dataset: {
							filters: {jointType: ParameterJointType.AND, filters: []},
							columns: [],
							joins: []
						},
						lastVisitTime: getCurrentTime(),
						lastModified: getCurrentTime(),
						createTime: getCurrentTime()
					}],
					isTemplate: false,
					lastVisitTime: getCurrentTime(),
					lastModified: getCurrentTime(),
					createTime: getCurrentTime()
				} as ConnectedSpace
			]);
		};
		on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		return () => {
			off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		};
	}, [on, off, fire, reports]);

	return <></>;
};