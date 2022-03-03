import {Topic} from '@/services/data/tuples/topic-types';
import {isAggregationTopic, isRawTopic} from '@/services/data/tuples/topic-utils';
import {ZipFiles} from '@/widgets/basic/utils';
import {OracleFactorTypeMap} from './oracle';
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

const buildFactors = (topic: Topic) => {
	if (isRawTopic(topic)) {
		return [
			...topic.factors.filter(factor => {
				return factor.flatten === true;
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
	return isAggregationTopic(topic) ? `\t${getAggregateAssistColumnName()} VARCHAR2(1024),` : '';
};
const buildVersion = (topic: Topic) => {
	return isAggregationTopic(topic) ? `\t${getVersionColumnName()} NUMBER(8),` : '';
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
	${getIdColumnName()} NUMBER(20),
${buildFactors(topic)}
${buildAggregateAssist(topic)}
${buildVersion(topic)}
	${getTenantIdColumnName()} VARCHAR2(50),
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
CREATE INDEX ${indexName}_${getTenantIdColumnName()} ON ${tableName} (${getTenantIdColumnName()});
CREATE INDEX ${indexName}_${getInsertTimeColumnName()} ON ${tableName} (${getInsertTimeColumnName()});
CREATE INDEX ${indexName}_${getUpdateTimeColumnName()} ON ${tableName} (${getUpdateTimeColumnName()});
`;
};

export const generateOracleCreateSQLScripts = (zip: ZipFiles, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip[`oracle/creation/${filename}.sql`] = createSQL(topic);
	});
};