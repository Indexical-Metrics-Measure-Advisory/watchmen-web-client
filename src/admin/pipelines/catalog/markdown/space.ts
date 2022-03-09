import {TopicsMap} from '@/services/data/pipeline/pipeline-relations';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Parameter, ParameterComputeType, ParameterCondition} from '@/services/data/tuples/factor-calculator-types';
import {FactorType} from '@/services/data/tuples/factor-types';
import {
	isComputedParameter,
	isConstantParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter
} from '@/services/data/tuples/parameter-utils';
import {Space} from '@/services/data/tuples/space-types';
import {Subject, SubjectDataSetColumn} from '@/services/data/tuples/subject-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {base64Encode} from '@/services/utils';

const findTopicIdsOnParameter = (parameter: Parameter | null | undefined): Array<TopicId> => {
	if (parameter == null) {
		return [];
	}

	if (isConstantParameter(parameter)) {
		return [];
	} else if (isTopicFactorParameter(parameter)) {
		return [parameter.topicId].filter(x => !!x);
	} else if (isComputedParameter(parameter)) {
		return (parameter.parameters || []).map(sub => {
			if (sub.on) {
				return [
					...findTopicIdsOnParameter(sub),
					...(sub.on.filters || []).map(filter => findTopicIdsOnParameterCondition(filter))
				];
			} else {
				return findTopicIdsOnParameter(sub);
			}
		}).flat(2);
	} else {
		return [];
	}
};
const findTopicIdsOnParameterCondition = (condition: ParameterCondition): Array<TopicId> => {
	if (isExpressionParameter(condition)) {
		return [...findTopicIdsOnParameter(condition.left), ...findTopicIdsOnParameter(condition.right)].filter(x => !!x);
	} else if (isJointParameter(condition)) {
		return (condition.filters || []).map(filter => findTopicIdsOnParameterCondition(filter)).flat().filter(x => !!x);
	} else {
		return [];
	}
};

const findTopicsOnSubject = (subject: Subject, topicsMap: TopicsMap): Array<Topic> => {
	const {filters: {filters = []} = {}, columns = [], joins = []} = subject.dataset ?? {};

	return [
		...new Set([
			...filters.map(filter => findTopicIdsOnParameterCondition(filter).filter(x => !!x))
				.flat(),
			...columns.map(column => column.parameter)
				.map(parameter => findTopicIdsOnParameter(parameter).filter(x => !!x))
				.flat(),
			// joins
			...joins.map(join => [join.topicId, join.secondaryTopicId].filter(x => !!x)).flat()
		])
	].map(topicId => topicsMap[topicId])
		.filter(topic => topic != null) as Array<Topic>;
};

const generateDataSetColumnType = (column: SubjectDataSetColumn, topicsMap: TopicsMap): string => {
	const {parameter} = column;

	if (isTopicFactorParameter(parameter)) {
		const {topicId, factorId} = parameter;
		const topic = topicsMap[topicId];
		if (topic == null) {
			return 'Unknown (Topic mismatched)';
		}
		// eslint-disable-next-line
		const factor = (topic.factors || []).find(factor => factor.factorId == factorId);
		if (factor == null) {
			return 'Unknown (Factor mismatched)';
		}

		return (factor.type || '`Unknown Type`').toUpperCase().replaceAll('-', ' ');
	} else if (isConstantParameter(parameter)) {
		return 'Constant Value';
	} else if (isComputedParameter(parameter)) {
		switch (parameter.type) {
			case ParameterComputeType.ADD:
			case ParameterComputeType.SUBTRACT:
			case ParameterComputeType.MULTIPLY:
			case ParameterComputeType.DIVIDE:
			case ParameterComputeType.MODULUS:
				return FactorType.NUMBER.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.YEAR_OF:
				return FactorType.YEAR.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.HALF_YEAR_OF:
				return FactorType.HALF_YEAR.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.QUARTER_OF:
				return FactorType.QUARTER.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.MONTH_OF:
				return FactorType.MONTH.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.WEEK_OF_YEAR:
				return FactorType.WEEK_OF_YEAR.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.WEEK_OF_MONTH:
				return FactorType.WEEK_OF_MONTH.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.DAY_OF_MONTH:
				return FactorType.DAY_OF_MONTH.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.DAY_OF_WEEK:
				return FactorType.DAY_OF_WEEK.toUpperCase().replaceAll('-', ' ');
			case ParameterComputeType.CASE_THEN:
				return 'ANY';
			case ParameterComputeType.NONE:
				return 'Unknown (Compute type missed)';
		}
	} else {
		return 'Unknown parameter type';
	}
};

const generateDataSetColumnTable = (subject: Subject, topicsMap: TopicsMap): string => {
	const {dataset: {columns = []} = {}} = subject;

	if (columns.length === 0) {
		return 'No columns defined.';
	}

	return `
|  | Name | Data Type |
| --- | --- | --- |
${columns.map((column, index) => {
		return `|${index + 1} | ${column.alias || 'Noname Column'} | ${generateDataSetColumnType(column, topicsMap)} |`;
	}).join('\n')}
`;
};

const generateSubject = (options: {
	subject: Subject; index: number; topicsMap: TopicsMap;
	connectedSpaceIndex: number, spaceIndex: number, sectionIndex: number;
}): string => {
	const {subject, index, topicsMap, connectedSpaceIndex, spaceIndex, sectionIndex} = options;

	const topics = findTopicsOnSubject(subject, topicsMap);
	const thumbnails = (subject.reports || []).filter(report => report.simulateThumbnail).map(report => report.simulateThumbnail);
	// console.log(thumbnails);

	return `##### ${sectionIndex}.${spaceIndex + 1}.2.${connectedSpaceIndex + 1}.${index + 1}. ${subject.name || 'Noname Subject'}
###### ${sectionIndex}.${spaceIndex + 1}.2.${connectedSpaceIndex + 1}.${index + 1}.1. Related Topics
${topics.length === 0 ? '> No related topic.' : ''}
${topics.filter(x => !!x).map(topic => {
		return `- <a href="#topic-${topic.topicId}">${topic.name || 'Noname Topic'}</a>`;
	}).join('\n')}

###### ${sectionIndex}.${spaceIndex + 1}.2.${connectedSpaceIndex + 1}.${index + 1}.2. Dataset Structure
${generateDataSetColumnTable(subject, topicsMap)}

###### ${sectionIndex}.${spaceIndex + 1}.2.${connectedSpaceIndex + 1}.${index + 1}.3. Thumbnails
${thumbnails.length === 0
		? '> No thumbnail.'
		: `<div style="display: grid; grid-template-columns: repeat(2, minmax(400px, calc((100% - 64px) / 3))); grid-column-gap: 32px; grid-row-gap: 16px; background-color: #fff; margin: 16px 0;">
${thumbnails.map(thumbnail => {
			return `<img src="${thumbnail}" alt="" style="max-width: 400px; max-height: 300px; border-radius: 12px; border: 2px solid #f3f3f3;"/>`;
		})}
</div>`}
`;
};

const generateConnectedSpace = (options: {
	connectedSpace: ConnectedSpace; index: number; topicsMap: TopicsMap;
	spaceIndex: number; sectionIndex: number;
}): string => {
	const {connectedSpace, index, topicsMap, spaceIndex, sectionIndex} = options;

	return `#### ${sectionIndex}.${spaceIndex + 1}.2.${index + 1}. ${connectedSpace.name || 'Noname Connected Space'}
		
<a href="data:application/json;base64,${base64Encode(JSON.stringify(connectedSpace))}" target="_blank" download="${connectedSpace.name || 'Noname Connected Space'}-${connectedSpace.connectId}.json">Download Meta File</a>

${!connectedSpace.subjects || connectedSpace.subjects.length === 0 ? '> No subject.' : ''}
${(connectedSpace.subjects || []).map((subject, subjectIndex) => {
		return generateSubject({
			subject,
			index: subjectIndex,
			topicsMap,
			connectedSpaceIndex: index,
			spaceIndex,
			sectionIndex
		});
	}).join('\n')}
`;
};

const generateSpaceMarkdown = (options: {
	space: Space; connectedSpaces: Array<ConnectedSpace>; index: number; topicsMap: TopicsMap;
	sectionIndex: number;
}): string => {
	const {space, connectedSpaces, index, topicsMap, sectionIndex} = options;

	return `## ${sectionIndex}.${index + 1}. ${space.name || 'Noname Space'} #${space.spaceId}<span id="space-${space.spaceId}"/>
${(space.description || '').replace(/\n/g, '  ').replace(/</g, '&lt;')}

<a href="data:application/json;base64,${base64Encode(JSON.stringify(space))}" target="_blank" download="${space.name || 'Noname Space'}-${space.spaceId}.json">Download Meta File</a>

### ${sectionIndex}.${index + 1}.1. Related Topics
${!space.topicIds || space.topicIds.length === 0 ? '> No related topic.' : ''}
${(space.topicIds || []).map(topicId => {
		return topicsMap[topicId];
	}).filter(x => !!x).map(topic => {
		return `- <a href="#topic-${topic.topicId}">${topic.name || 'Noname Topic'}</a>`;
	}).join('\n')}

### ${sectionIndex}.${index + 1}.2. Connected Spaces as Templates
${!connectedSpaces || connectedSpaces.length === 0 ? '> No connected space as template.' : ''}
${(connectedSpaces || []).map((connectedSpace, connectedSpaceIndex) => {
		return generateConnectedSpace({
			connectedSpace,
			index: connectedSpaceIndex,
			topicsMap,
			spaceIndex: index,
			sectionIndex
		});
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