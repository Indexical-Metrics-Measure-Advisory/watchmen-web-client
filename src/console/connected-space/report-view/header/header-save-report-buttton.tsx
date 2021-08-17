import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {ICON_SAVE} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {Report} from '../../../../services/tuples/report-types';
import {saveReport} from '../../../../services/tuples/report';
import {ButtonInk} from '../../../../basic-widgets/types';
import {useReportEventBus} from '../../../../report/report-event-bus';
import {ReportEventTypes} from '../../../../report/report-event-bus-types';

interface SaveState {
	styleChanged: boolean;
	structureChanged: boolean;
}

export const HeaderSaveReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useReportEventBus();
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

	const onSaveClicked = () => {
		if (changed.styleChanged || changed.structureChanged) {
			// structure changed
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveReport(report),
				() => setChanged({styleChanged: false, structureChanged: false}));
		}
	};

	const hasChange = changed.styleChanged || changed.structureChanged;

	return <PageHeaderButton tooltip={Lang.ACTIONS.SAVE} onClick={onSaveClicked}
	                         ink={hasChange ? ButtonInk.DANGER : (void 0)}>
		<FontAwesomeIcon icon={ICON_SAVE}/>
	</PageHeaderButton>;
};