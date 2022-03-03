import {Topic} from '@/services/data/tuples/topic-types';
import {isNotAggregationTopic, isRawTopic} from '@/services/data/tuples/topic-utils';
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
	getInsertTimeColumnName,
	getRawTopicDataColumnName,
	getTenantIdColumnName,
	getUpdateTimeColumnName,
	getVersionColumnName
} from './utils';

const buildColumn = (topic: Topic, columnName: string, columnType: string) => {
	const tableName = asFullTopicName(topic);
	return `\tSELECT COUNT(1) INTO columnExists FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${columnName}';
	IF columnExists = 0 THEN  
		-- add columns
	    EXECUTE IMMEDIATE 'ALTER TABLE ${tableName} ADD (${columnName} ${columnType})';
	ELSE
		-- modify columns
		EXECUTE IMMEDIATE 'ALTER TABLE ${tableName} MODIFY (${columnName} ${columnType})';
	END IF;`;
};
const buildFactors = (topic: Topic) => {
	if (isRawTopic(topic)) {
		return [
			...topic.factors.filter(factor => {
				return factor.flatten === true;
			}).map(factor => {
				return buildColumn(topic, asFactorName(factor), OracleFactorTypeMap[factor.type]);
			}),
			buildColumn(topic, getRawTopicDataColumnName(), 'CLOB')
		].join('\n');
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return buildColumn(topic, asFactorName(factor), OracleFactorTypeMap[factor.type]);
		}).join('\n');
	}
};

const buildAggregateAssist = (topic: Topic) => {
	if (isNotAggregationTopic(topic)) {
		return '';
	}

	return buildColumn(topic, getAggregateAssistColumnName(), 'VARCHAR2(1024)');
};
const buildVersionAssist = (topic: Topic) => {
	if (isNotAggregationTopic(topic)) {
		return '';
	}

	return buildColumn(topic, getVersionColumnName(), 'NUMBER(8)');
};
const buildTenantIdColumn = (topic: Topic) => {
	return buildColumn(topic, getTenantIdColumnName(), 'VARCHAR2(50)');
};
const buildAuditTimeColumn = (topic: Topic, columnName: string) => {
	return buildColumn(topic, columnName, 'DATE');
};

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const tableName = asFullTopicName(topic);
	const uniqueIndexName = asUniqueIndexName(topic);
	const indexName = asIndexName(topic);

	return `-- procedure for topic[id=${topic.topicId}, name=${topic.name}]
CREATE OR REPLACE PROCEDURE SCHEMA_CHANGE AS
	CURSOR cursorIndexes IS SELECT UI.INDEX_NAME
		FROM USER_INDEXES UI
		WHERE UI.TABLE_NAME = '${tableName}'
        AND NOT EXISTS (SELECT 1 FROM USER_CONSTRAINTS WHERE TABLE_NAME = '${tableName}' AND CONSTRAINT_TYPE = 'P' AND CONSTRAINT_NAME = UI.INDEX_NAME);
    columnExists NUMBER;
BEGIN 
	-- will not drop any column even it is not in definition, just keep it
${buildFactors(topic)}
${buildAggregateAssist(topic)}
${buildVersionAssist(topic)}
${buildTenantIdColumn(topic)}
${buildAuditTimeColumn(topic, getInsertTimeColumnName())}
${buildAuditTimeColumn(topic, getUpdateTimeColumnName())}

	-- drop existed indexes
	-- simply uncomment the following loop to drop all exists indexes
	-- considering performance of rebuild indexes, manually drop useless indexes accurate is recommended.
	-- according to duplication check of index names, following create scripts need to be adjusted manually as well.
	-- FOR anIndex in cursorIndexes LOOP
	-- 	EXECUTE IMMEDIATE CONCAT('DROP INDEX ', anIndex.INDEX_NAME);
	-- END LOOP;
	
	-- unique index
${Object.values(uniqueIndexes).map((factors, index) => {
		return `	EXECUTE IMMEDIATE 'CREATE UNIQUE INDEX ${uniqueIndexName}_${index + 1} ON ${tableName} (${factors.map(factor => asFactorName(factor)).join(', ')})';`;
	}).join('\n')}

	-- index
${Object.values(indexes).map((factors, index) => {
		return `	EXECUTE IMMEDIATE 'CREATE INDEX ${indexName}_${index + 1} ON ${tableName} (${factors.map(factor => asFactorName(factor)).join(', ')})';`;
	}).join('\n')}
	EXECUTE IMMEDIATE 'CREATE INDEX ${indexName}_${getTenantIdColumnName()} ON ${tableName} (${getTenantIdColumnName()})';
	EXECUTE IMMEDIATE 'CREATE INDEX ${indexName}_${getInsertTimeColumnName()} ON ${tableName} (${getInsertTimeColumnName()})';
	EXECUTE IMMEDIATE 'CREATE INDEX ${indexName}_${getUpdateTimeColumnName()} ON ${tableName} (${getUpdateTimeColumnName()})';
END;
CALL SCHEMA_CHANGE();
DROP PROCEDURE SCHEMA_CHANGE;
`;
};

export const generateOracleAlterSQLScripts = (zip: ZipFiles, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip[`oracle/alteration/${filename}.sql`] = createSQL(topic);
	});
};