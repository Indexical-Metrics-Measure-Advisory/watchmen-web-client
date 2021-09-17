import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {saveReport} from '@/services/data/tuples/report';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_SAVE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';

interface SaveState {
	styleChanged: boolean;
	structureChanged: boolean;
}

export const HeaderSaveReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useReportEventBus();
	const [changed, setChanged] = useState<SaveState>({styleChanged: false, structureChanged: false});
	useEffect(() => {
		const onStyleChanged = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			setChanged(state => {
				return {...state, styleChanged: true};
			});
		};
		const onStructureChanged = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			setChanged(state => {
				return {...state, structureChanged: true};
			});
		};
		on(ReportEventTypes.STYLE_CHANGED, onStyleChanged);
		on(ReportEventTypes.STRUCTURE_CHANGED, onStructureChanged);
		return () => {
			off(ReportEventTypes.STYLE_CHANGED, onStyleChanged);
			off(ReportEventTypes.STRUCTURE_CHANGED, onStructureChanged);
		};
	}, [on, off, report]);
	useEffect(() => {
		const onAskReportChanged = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			fire(ReportEventTypes.REPLY_REPORT_STRUCTURE_CHANGED, report, changed.structureChanged);
		};
		on(ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, onAskReportChanged);
		return () => {
			off(ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, onAskReportChanged);
		};
	}, [on, off, fire, report, changed]);

	const onSaveClicked = () => {
		if (changed.styleChanged || changed.structureChanged) {
			// structure changed
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveReport(report),
				() => {
					setChanged({styleChanged: false, structureChanged: false});
					fire(ReportEventTypes.DATA_SAVED, report);
				});
		}
	};

	const hasChange = changed.styleChanged || changed.structureChanged;

	return <PageHeaderButton tooltip={Lang.ACTIONS.SAVE} onClick={onSaveClicked}
	                         ink={hasChange ? ButtonInk.DANGER : (void 0)}>
		<FontAwesomeIcon icon={ICON_SAVE}/>
	</PageHeaderButton>;
};