import {Topic} from '@/services/data/tuples/topic-types';
import {isNotAggregationTopic, isRawTopic} from '@/services/data/tuples/topic-utils';
import {ZipFiles} from '@/widgets/basic/utils';
import {MySQLFactorTypeMap} from './mysql';
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
	return `\tIF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${columnName}') THEN  
		-- add columns
		ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType};
	ELSE
		-- modify columns
		ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${columnType};
	END IF;`;
};
const buildFactors = (topic: Topic) => {
	if (isRawTopic(topic)) {
		return [
			...topic.factors.filter(factor => {
				return factor.flatten === true;
			}).map(factor => {
				return buildColumn(topic, asFactorName(factor), MySQLFactorTypeMap[factor.type]);
			}),
			buildColumn(topic, getRawTopicDataColumnName(), 'JSON')
		].join('\n');
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return buildColumn(topic, asFactorName(factor), MySQLFactorTypeMap[factor.type]);
		}).join('\n');
	}
};

const buildAggregateAssist = (topic: Topic) => {
	if (isNotAggregationTopic(topic)) {
		return '';
	}

	return buildColumn(topic, getAggregateAssistColumnName(), 'JSON');
};
const buildVersionAssist = (topic: Topic) => {
	if (isNotAggregationTopic(topic)) {
		return '';
	}

	return buildColumn(topic, getVersionColumnName(), 'INT');
};
const buildTenantIdColumn = (topic: Topic) => {
	return buildColumn(topic, getTenantIdColumnName(), 'VARCHAR(50)');
};
const buildAuditTimeColumn = (topic: Topic, columnName: string) => {
	return buildColumn(topic, columnName, 'DATETIME');
};

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const tableName = asFullTopicName(topic);
	const uniqueIndexName = asUniqueIndexName(topic);
	const indexName = asIndexName(topic);

	return `-- procedure for topic[id=${topic.topicId}, name=${topic.name}]
DROP PROCEDURE IF EXISTS SCHEMA_CHANGE;
DELIMITER $$
CREATE PROCEDURE SCHEMA_CHANGE() 
BEGIN 
	DECLARE CurrentDatabase VARCHAR(100);

	SELECT DATABASE() INTO CurrentDatabase;

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
	-- SELECT COUNT(1) INTO @indexCount FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = '${tableName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
	-- WHILE @indexCount != 0 DO
	--	SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = '${tableName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
	--	SET @sql = concat('DROP INDEX ', @indexName, ' ON ${tableName};');
	--	PREPARE stmt FROM @sql;
	--	EXECUTE stmt;
	--	DEALLOCATE PREPARE stmt;
	--	SELECT COUNT(1) INTO @indexCount FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = '${tableName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
	-- END WHILE;
	
	-- unique index
${Object.values(uniqueIndexes).map((factors, index) => {
		return `	CREATE UNIQUE INDEX ${uniqueIndexName}_${index + 1} ON ${tableName} (${factors.map(factor => asFactorName(factor)).join(', ')});`;
	}).join('\n')}

	-- index
${Object.values(indexes).map((factors, index) => {
		return `	CREATE INDEX ${indexName}_${index + 1} ON ${tableName} (${factors.map(factor => asFactorName(factor)).join(', ')});`;
	}).join('\n')}
	CREATE INDEX ${indexName}_${getTenantIdColumnName()} ON ${tableName} (${getTenantIdColumnName()});
	CREATE INDEX ${indexName}_${getInsertTimeColumnName()} ON ${tableName} (${getInsertTimeColumnName()});
	CREATE INDEX ${indexName}_${getUpdateTimeColumnName()} ON ${tableName} (${getUpdateTimeColumnName()});
END $$
DELIMITER ;
CALL \`SCHEMA_CHANGE\`();
DROP PROCEDURE IF EXISTS SCHEMA_CHANGE;
`;
};
// -- there is no syntax to drop all existed indexes, use the following procedure to remove them
// -- default commented
// SELECT CONCAT('ALTER TABLE ', STAT.TABLE_NAME,' DROP INDEX ', STAT.INDEX_NAME,' ;')
// FROM INFORMATION_SCHEMA.STATISTICS STAT
// WHERE TABLE_SCHEMA = '?' AND STAT.INDEX_NAME <> 'PRIMARY';

export const generateMySQLAlterSQLScripts = (zip: ZipFiles, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip[`mysql/alteration/${filename}.sql`] = createSQL(topic);
	});
};