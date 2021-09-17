import {MonitorLogRow} from '@/services/data/admin/logs';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DetailProcess} from './detail-process';
import {TriggerData} from './trigger-data';
import {RowDetailContainer} from './widgets';

export const ResultRowDetail = (props: {
	row: MonitorLogRow;
	pipeline: Pipeline;
	topicsMap: Map<string, Topic>;
	onClose: () => void;
}) => {
	const {row, pipeline, topicsMap, onClose} = props;

	return <RowDetailContainer>
		<TriggerData row={row} pipeline={pipeline}/>
		<DetailProcess row={row} pipeline={pipeline} topicsMap={topicsMap} onClose={onClose}/>
	</RowDetailContainer>;
};