import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ReportEditor} from '../editor';
import {WorkbenchContainer} from './widgets';

export const ReportWorkbench = (props: { connectedSpace: ConnectedSpace; subject: Subject; report: Report; editable: boolean }) => {
	const {connectedSpace, subject, report, editable} = props;

	return <WorkbenchContainer>
		<ReportEditor connectedSpace={connectedSpace} subject={subject} report={report}
		              editable={editable}/>
	</WorkbenchContainer>;
};