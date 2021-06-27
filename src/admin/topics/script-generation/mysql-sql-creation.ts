import {Topic, TopicType} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {asFactorName, asTopicName, gatherIndexes, gatherUniqueIndexes} from './utils';
import {MySQLFactorTypeMap} from './mysql';

const buildFactors = (topic: Topic) => {
	if (topic.type === TopicType.RAW) {
		return '\tDATA_ JSON,';
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return `\t${asFactorName(factor)} ${MySQLFactorTypeMap[factor.type]},`;
		}).join('\n');
	}
};

const buildAggregateAssist = (topic: Topic) => {
	return [TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type) ? `_AGGREGATE_ASSIST JSON,` : '';
};

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const topicName = asTopicName(topic);

	return `-- sqls for topic[id=${topic.topicId}, name=${topic.name}]
-- drop, commented default
-- DROP TABLE IF EXISTS TOPIC_${topicName};

-- create 
CREATE TABLE TOPIC_${topicName}(
	ID_ VARCHAR(60),
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
	PRIMARY KEY (ID_)
);

`;
};

export const generateMySQLCreateSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`mysql/creation/${filename}.sql`, createSQL(topic));
	});
};