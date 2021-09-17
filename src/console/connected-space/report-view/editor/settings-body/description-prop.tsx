import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {ChangeEvent} from 'react';
import {PropExclusiveValue, PropValueInputLines, SectionContainer} from '../settings-widgets/widgets';

export const DescriptionPropEditor = (props: { report: Report }) => {
	const {report} = props;

	const forceUpdate = useForceUpdate();
	const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const {value} = event.target;
		report.description = value;
		forceUpdate();
	};

	return <>
		<SectionContainer expanded={true}>
			<span>{Lang.CHART.DESCRIPTION}</span>
		</SectionContainer>
		<PropExclusiveValue>
			<PropValueInputLines value={report.description || ''} onChange={onDescriptionChange}
			                     placeholder={Lang.PLAIN.REPORT_DESCRIPTION_PLACEHOLDER}/>
		</PropExclusiveValue>
	</>;
};