import {Topic, TopicType} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {asFactorName, asTopicName, gatherIndexes, gatherUniqueIndexes} from './utils';
import {MySQLFactorTypeMap} from './mysql';

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const topicName = asTopicName(topic);

	return `-- procedure for topic[id=${topic.topicId}, name=${topic.name}]
DROP PROCEDURE IF EXISTS SCHEMA_CHANGE;
DELIMITER $$
CREATE PROCEDURE SCHEMA_CHANGE() 
BEGIN 
	DECLARE CurrentDatabase VARCHAR(100);

	SELECT DATABASE() INTO CurrentDatabase;

	-- will not drop any column even it is not in definition, just keep it
${topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
		const factorColumnName = asFactorName(factor);
		return `    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '${factorColumnName}') THEN  
		-- add columns
		ALTER TABLE TOPIC_${topicName} ADD COLUMN ${factorColumnName} ${MySQLFactorTypeMap[factor.type]};
	ELSE
		-- modify columns
		ALTER TABLE TOPIC_${topicName} MODIFY COLUMN ${factorColumnName} ${MySQLFactorTypeMap[factor.type]};
	END IF;`;
	}).join('\n')}
${[TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type)
		? `\tIF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '_AGGREGATE_ASSIST') THEN
		-- add columns
	    EXECUTE IMMEDIATE 'ALTER TABLE TOPIC_${topicName} ADD (_AGGREGATE_ASSIST VARCHAR2(1024))';
	ELSE
		-- modify columns
		EXECUTE IMMEDIATE 'ALTER TABLE TOPIC_${topicName} MODIFY (_AGGREGATE_ASSIST VARCHAR2(1024))';
	END IF;`
		: ''}

	-- drop existed indexes
	-- simply uncomment the following loop to drop all exists indexes
	-- considering performance of rebuild indexes, manually drop useless indexes accurate is recommended.
	-- according to duplication check of index names, following create scripts need to be adjusted manually as well.
	-- SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = 'TOPIC_${topicName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
	-- WHILE @indexName IS NOT NULL DO
	--	SET @sql = concat('DROP INDEX ', @indexName, ' ON TOPIC_${topicName};');
	--	PREPARE stmt FROM @sql;
	--	EXECUTE stmt;
	--	DEALLOCATE PREPARE stmt;
	--	SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = CurrentDatabase AND TABLE_NAME = 'TOPIC_${topicName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
	-- END WHILE;
	
	-- unique index
${Object.values(uniqueIndexes).map((factors, index) => {
		return `	CREATE UNIQUE INDEX U_${topicName}_${index + 1} ON TOPIC_${topicName} (${factors.map(factor => asFactorName(factor)).join(', ')});`;
	}).join('\n')}

	-- index
${Object.values(indexes).map((factors, index) => {
		return `	CREATE INDEX I_${topicName}_${index + 1} ON TOPIC_${topicName} (${factors.map(factor => asFactorName(factor)).join(', ')});`;
	}).join('\n')}

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

export const generateMySQLAlterSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`mysql/alteration/${filename}.sql`, createSQL(topic));
	});
};