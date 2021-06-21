import {Topic} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {asFactorName, asTopicName, gatherIndexes, gatherUniqueIndexes} from './utils';
import {OracleFactorTypeMap} from './oracle';

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const topicName = asTopicName(topic);

	return `-- procedure for topic[id=${topic.topicId}, name=${topic.name}]
CREATE OR REPLACE PROCEDURE SCHEMA_CHANGE AS
	CURSOR cursorIndexes IS SELECT UI.INDEX_NAME
		FROM USER_INDEXES UI
		WHERE UI.TABLE_NAME = 'TOPIC_${topicName}'
        AND NOT EXISTS (SELECT 1 FROM USER_CONSTRAINTS WHERE TABLE_NAME = 'TOPIC_${topicName}' AND CONSTRAINT_TYPE = 'P' AND CONSTRAINT_NAME = UI.INDEX_NAME);
    columnExists NUMBER;
BEGIN 
	-- will not drop any column even it is not in definition, just keep it
${topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
		const factorColumnName = asFactorName(factor);
		return `    SELECT COUNT(1) INTO columnExists FROM USER_TAB_COLUMNS WHERE TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '${factorColumnName}';
	IF columnExists = 0 THEN  
		-- add columns
	    EXECUTE IMMEDIATE 'ALTER TABLE TOPIC_${topicName} ADD (${factorColumnName} ${OracleFactorTypeMap[factor.type]})';
	ELSE
		-- modify columns
		EXECUTE IMMEDIATE 'ALTER TABLE TOPIC_${topicName} MODIFY (${factorColumnName} ${OracleFactorTypeMap[factor.type]})';
	END IF;`;
	}).join('\n')}

	-- drop existed indexes
	FOR anIndex in cursorIndexes LOOP
		EXECUTE IMMEDIATE CONCAT('DROP INDEX ', anIndex.INDEX_NAME);
	END LOOP;
	
	-- unique index
${Object.values(uniqueIndexes).map((factors, index) => {
		return `	EXECUTE IMMEDIATE 'CREATE UNIQUE INDEX U_${topicName}_${index + 1} ON TOPIC_${topicName} (${factors.map(factor => asFactorName(factor)).join(', ')})';`;
	}).join('\n')}

	-- index
${Object.values(indexes).map((factors, index) => {
		return `	EXECUTE IMMEDIATE 'CREATE INDEX I_${topicName}_${index + 1} ON TOPIC_${topicName} (${factors.map(factor => asFactorName(factor)).join(', ')})';`;
	}).join('\n')}

END;
CALL SCHEMA_CHANGE();
DROP PROCEDURE SCHEMA_CHANGE;
`;
};

export const generateOracleAlterSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`oracle/sql/alteration/${filename}.sql`, createSQL(topic));
	});
};