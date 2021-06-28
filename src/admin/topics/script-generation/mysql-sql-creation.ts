import {Topic, TopicType} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {
	asFactorName,
	asFullTopicName,
	asTopicName,
	gatherIndexes,
	gatherUniqueIndexes,
	getAggregateAssistColumnName,
	getIdColumnName,
	getRawTopicDataColumnName
} from './utils';
import {MySQLFactorTypeMap} from './mysql';

const buildFactors = (topic: Topic) => {
	if (topic.type === TopicType.RAW) {
		return `\t${getRawTopicDataColumnName()} JSON,`;
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return `\t${asFactorName(factor)} ${MySQLFactorTypeMap[factor.type]},`;
		}).join('\n');
	}
};

const buildAggregateAssist = (topic: Topic) => {
	return [TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type) ? `${getAggregateAssistColumnName()} JSON,` : '';
};

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const tableName = asFullTopicName(topic);

	return `-- sqls for topic[id=${topic.topicId}, name=${topic.name}]
-- drop, commented default
-- DROP TABLE IF EXISTS ${tableName};

-- create 
CREATE TABLE ${tableName}(
	${getIdColumnName()} VARCHAR(60),
${buildFactors(topic)}
	${buildAggregateAssist(topic)}

	-- unique index
${Object.values(uniqueIndexes).map(factors => {
		return `    UNIQUE INDEX (${factors.map(factor => asFactorName(factor)).join(', ')}),`;
	}).join('\n')}

	-- index
${Object.values(indexes).map(factors => {
		return `    INDEX (${factors.map(factor => asFactorName(factor)).join(', ')}),`;
	}).join('\n')}

	-- primary key
	PRIMARY KEY (${getIdColumnName()})
);

`;
};

export const generateMySQLCreateSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`mysql/creation/${filename}.sql`, createSQL(topic));
	});
};