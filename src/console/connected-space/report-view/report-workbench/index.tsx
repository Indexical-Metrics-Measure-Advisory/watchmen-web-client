import {Subject} from '../../../../services/tuples/subject-types';
import {WorkbenchContainer} from './widgets';
import {Report} from '../../../../services/tuples/report-types';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';

export const ReportWorkbench = (props: { connectedSpace: ConnectedSpace; subject: Subject; report: Report; editable: boolean }) => {
	const {connectedSpace, subject, report, editable} = props;

	return <WorkbenchContainer>
	</WorkbenchContainer>;
};