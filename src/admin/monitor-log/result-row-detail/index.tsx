import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICON_CLOSE } from '../../../basic-widgets/constants';
import { ButtonInk } from '../../../basic-widgets/types';
import { MonitorLogRow } from '../../../services/admin/logs';
import { Pipeline } from '../../../services/tuples/pipeline-types';
import { Topic } from '../../../services/tuples/topic-types';
import { TriggerData } from './trigger-data';
import { CloseButton, RowDetailContainer } from './widgets';

export const ResultRowDetail = (props: {
	row: MonitorLogRow;
	pipeline: Pipeline;
	topicsMap: Map<string, Topic>;
	onClose: () => void;
}) => {
	const { row, pipeline, onClose } = props;

	return <RowDetailContainer>
		<TriggerData row={row} pipeline={pipeline}/>
		<CloseButton ink={ButtonInk.PRIMARY} onClick={onClose}>
			<FontAwesomeIcon icon={ICON_CLOSE}/>
			<span>Close</span>
		</CloseButton>
	</RowDetailContainer>;
};