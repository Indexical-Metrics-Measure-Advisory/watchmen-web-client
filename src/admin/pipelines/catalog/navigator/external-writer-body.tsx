import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {findExternalWriterIds} from '@/services/data/tuples/pipeline-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
// noinspection ES6PreferShortImport
import {useExternalWriters} from '../../../cache/use-external-writers';
import {ExternalWriterBodyContainer, NoExternalWriter, WriterRow} from './external-writer-widgets';

export const ExternalWriterBody = (props: { pipelines: Array<Pipeline>, topic: Topic, visible: boolean }) => {
	const {pipelines, topic, visible} = props;

	const [externalWriters] = useExternalWriters();

	const writerIds = findExternalWriterIds(pipelines, topic);
	const hasWriter = writerIds.length !== 0;

	return <ExternalWriterBodyContainer visible={visible}>
		{hasWriter
			? writerIds.map(writerId => {
				// eslint-disable-next-line
				const writer = externalWriters.find(writer => writer.writerId == writerId);
				return <WriterRow key={writerId}>
					{writer ? writer.writerCode : 'Writer Definition Missed.'}
				</WriterRow>;
			})
			: <NoExternalWriter>No external writer defined.</NoExternalWriter>
		}
	</ExternalWriterBodyContainer>;
};