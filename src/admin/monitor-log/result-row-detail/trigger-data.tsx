import { diff, formatters } from 'jsondiffpatch';
import 'jsondiffpatch/dist/formatters-styles/html.css';
import React, { useState } from 'react';
import { Toggle } from '../../../basic-widgets/toggle';
import { MonitorLogRow } from '../../../services/admin/logs';
import { Pipeline } from '../../../services/tuples/pipeline-types';
import { isMockService } from '../../../services/utils';
import demoData from './pipeline.json';
import { Diff, PipelineTypeLabel, ShowUnchanged, Title, TriggerDataContainer } from './widgets';

export const TriggerData = (props: {
	row: MonitorLogRow;
	pipeline: Pipeline;
}) => {
	const { row, pipeline } = props;

	const [ showUnchanged, setShowUnchanged ] = useState(false);

	const onUnchangedChanged = (value: boolean) => setShowUnchanged(value);

	const { oldValue = getOldOne(), newValue = getNewOne() } = row;
	const delta = diff(oldValue, newValue);
	formatters.html.showUnchanged(showUnchanged);
	const changes = formatters.html.format(delta!, oldValue);

	return <TriggerDataContainer>
		<Title>
			<span>Trigger by</span>
			<PipelineTypeLabel>{pipeline.type}</PipelineTypeLabel>
		</Title>
		<ShowUnchanged>
			<Toggle value={showUnchanged} onChange={onUnchangedChanged}/>
			<span>Show Unchanged Content</span>
		</ShowUnchanged>
		<Diff dangerouslySetInnerHTML={{ __html: changes }}/>
	</TriggerDataContainer>;
};

const getOldOne = () => {
	return isMockService() ? demoData.oldValue : {};
};

const getNewOne = () => {
	return isMockService() ? demoData.newValue : {};
};
