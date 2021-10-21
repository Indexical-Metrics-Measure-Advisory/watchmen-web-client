import {TopicsMap} from '@/services/data/pipeline/pipeline-relations';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Space} from '@/services/data/tuples/space-types';

const generateSpaceMarkdown = (options: {
	space: Space; connectedSpaces: Array<ConnectedSpace>; index: number; topicsMap: TopicsMap;
	sectionIndex: number;
}): string => {
	const {space, connectedSpaces, index, topicsMap, sectionIndex} = options;

	return `## ${sectionIndex}.${index + 1}. ${space.name || 'Noname Space'} #${space.spaceId}<span id="space-${space.spaceId}"/>
${space.description || ''}

<a href="data:application/json;base64,${window.btoa(JSON.stringify(space))}" target="_blank" download="${space.name || 'Noname Space'}-${space.spaceId}.json">Download Meta File</a>

### ${sectionIndex}.${index + 1}.1. Related Topics
${!space.topicIds || space.topicIds.length === 0 ? '> No related topic.' : ''}
${(space.topicIds || []).map(topicId => {
		return topicsMap[topicId];
	}).filter(x => !!x).map(topic => {
		return `- <a href="#topic-${topic.topicId}">${topic.name || 'Noname Topic'}</a>`;
	}).join('\n')}

### ${sectionIndex}.${index + 1}.2. Connected Spaces and Subjects for Templates
${!connectedSpaces || connectedSpaces.length === 0 ? '> No connected space or subject.' : ''}
${(connectedSpaces || []).map((connectedSpace, connectedSpaceIndex) => {
		return `### ${sectionIndex}.${index + 1}.2.${connectedSpaceIndex + 1}. Subjects of ${connectedSpace.name || 'Noname Connected Space'}
		
<a href="data:application/json;base64,${window.btoa(JSON.stringify(connectedSpace))}" target="_blank" download="${connectedSpace.name || 'Noname Connected Space'}-${connectedSpace.connectId}.json">Download Meta File</a>

${!connectedSpace.subjects || connectedSpace.subjects.length === 0 ? '> No subject.' : ''}
${(connectedSpace.subjects || []).map(subject => {
			return `- ${subject.name || 'Noname Subject'}`;
		}).join('\n')}
`;
	}).join('\n')}
`;
};

export const generateSpaces = (options: {
	spaces: Array<Space>; connectedSpaces: Array<ConnectedSpace>; topicsMap: TopicsMap;
	sectionIndex: number;
}): string => {
	const {spaces, connectedSpaces, topicsMap, sectionIndex} = options;

	if (spaces.length === 0) {
		return '> No spaces.';
	}

	return spaces.sort((s1, s2) => {
		return (s1.name || '').toLowerCase().localeCompare((s2.name || '').toLowerCase());
	}).map((space, index) => {
		// eslint-disable-next-line
		const myConnectedSpaces = connectedSpaces.filter(connectedSpace => connectedSpace.spaceId == space.spaceId);
		return generateSpaceMarkdown({space, connectedSpaces: myConnectedSpaces, index, topicsMap, sectionIndex});
	}).join('\n');
};