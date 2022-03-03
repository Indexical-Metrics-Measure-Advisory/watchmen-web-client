import {Topic} from '@/services/data/tuples/topic-types';
import {isAggregationTopic, isRawTopic} from '@/services/data/tuples/topic-utils';
import {ZipFiles} from '@/widgets/basic/utils';
import {MySQLFactorTypeMap} from './mysql';
import {
	asFactorName,
	asFullTopicName,
	asTopicName,
	gatherIndexes,
	gatherUniqueIndexes,
	getAggregateAssistColumnName,
	getIdColumnName,
	getInsertTimeColumnName,
	getRawTopicDataColumnName,
	getTenantIdColumnName,
	getUpdateTimeColumnName,
	getVersionColumnName
} from './utils';

const buildFactors = (topic: Topic) => {
	if (isRawTopic(topic)) {
		return [
			...topic.factors.filter(factor => {
				return factor.flatten === true;
			}).map(factor => {
				return `\t${asFactorName(factor)} ${MySQLFactorTypeMap[factor.type]},`;
			}),
			`\t${getRawTopicDataColumnName()} JSON,`
		].join('\n');
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return `\t${asFactorName(factor)} ${MySQLFactorTypeMap[factor.type]},`;
		}).join('\n');
	}
};

const buildAggregateAssist = (topic: Topic) => {
	return isAggregationTopic(topic) ? `\t${getAggregateAssistColumnName()} JSON,` : '';
};
const buildVersion = (topic: Topic) => {
	return isAggregationTopic(topic) ? `\t${getVersionColumnName()} INT,` : '';
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
	${getIdColumnName()} BIGINT,
${buildFactors(topic)}
${buildAggregateAssist(topic)}
${buildVersion(topic)}
	${getTenantIdColumnName()} VARCHAR(50),
	${getInsertTimeColumnName()} DATETIME,
	${getUpdateTimeColumnName()} DATETIME,

	-- unique index
${Object.values(uniqueIndexes).map(factors => {
		return `    UNIQUE INDEX (${factors.map(factor => asFactorName(factor)).join(', ')}),`;
	}).join('\n')}

	-- index
${Object.values(indexes).map(factors => {
		return `    INDEX (${factors.map(factor => asFactorName(factor)).join(', ')}),`;
	}).join('\n')}
	INDEX (${getTenantIdColumnName()}),
	INDEX (${getInsertTimeColumnName()}),
	INDEX (${getUpdateTimeColumnName()}),

	-- primary key
	PRIMARY KEY (${getIdColumnName()})
);

`;
};

export const generateMySQLCreateSQLScripts = (zip: ZipFiles, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip[`mysql/creation/${filename}.sql`] = createSQL(topic);
	});
};