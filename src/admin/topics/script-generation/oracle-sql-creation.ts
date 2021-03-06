import {Topic, TopicType} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {
	asFactorName,
	asFullTopicName,
	asIndexName,
	asTopicName,
	asUniqueIndexName,
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
import {OracleFactorTypeMap} from './oracle';

const buildFactors = (topic: Topic) => {
	if (topic.type === TopicType.RAW) {
		return [
			...topic.factors.filter(factor => {
				return factor.name.indexOf('.') === -1 && factor.flatten === true;
			}).map(factor => {
				return `\t${factor.name.toUpperCase()} ${OracleFactorTypeMap[factor.type]},`;
			}),
			`\t${getRawTopicDataColumnName()} CLOB,`
		].join('\n');
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return `\t${factor.name.toUpperCase()} ${OracleFactorTypeMap[factor.type]},`;
		}).join('\n');
	}
};

const buildAggregateAssist = (topic: Topic) => {
	return [TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type) ? `\t${getAggregateAssistColumnName()} VARCHAR2(1024),` : '';
};
const buildVersion = (topic: Topic) => {
	return [TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type) ? `\t${getVersionColumnName()} NUMBER(8),` : '';
};

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const tableName = asFullTopicName(topic);
	const uniqueIndexName = asUniqueIndexName(topic);
	const indexName = asIndexName(topic);

	return `-- sqls for topic[id=${topic.topicId}, name=${topic.name}]
-- drop, commented default
-- DROP TABLE ${tableName};

-- create 
CREATE TABLE ${tableName}(
	${getIdColumnName()} VARCHAR2(60),
${buildFactors(topic)}
${buildAggregateAssist(topic)}
${buildVersion(topic)}
	${getTenantIdColumnName()} VARCHAR2(32),
	${getInsertTimeColumnName()} DATE,
	${getUpdateTimeColumnName()} DATE,

	-- primary key
	PRIMARY KEY (${getIdColumnName()})
);

-- unique index
${Object.values(uniqueIndexes).map((factors, index) => {
		return `CREATE UNIQUE INDEX ${uniqueIndexName}_${index + 1} ON ${tableName}(${factors.map(factor => asFactorName(factor)).join(', ')});`;
	}).join('\n')}

-- index
${Object.values(indexes).map((factors, index) => {
		return `CREATE INDEX ${indexName}_${index + 1} ON ${tableName}(${factors.map(factor => asFactorName(factor)).join(', ')});`;
	}).join('\n')}
`;
};

export const generateOracleCreateSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`oracle/creation/${filename}.sql`, createSQL(topic));
	});
};