import JSZip from 'jszip';
import {Topic} from '../../../services/tuples/topic-types';
import {asFactorName, asTopicName, gatherIndexes, gatherUniqueIndexes} from './utils';
import {OracleFactorTypeMap} from './oracle';
import {FactorType} from '../../../services/tuples/factor-types';
import {MySQLFactorTypeMap} from './mysql';
import {v4} from 'uuid';

const createXML = (topic: Topic) => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const topicName = asTopicName(topic);

	return `<?xml version="1.0" encoding="UTF-8"?>  
<databaseChangeLog  
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"  
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">
	<property dbms="oracle" name="pk.type" value="VARCHAR2(60)"/>
${Object.keys(OracleFactorTypeMap).map(factorType => {
		return `\t<property dbms="oracle" name="${factorType}.type" value="${OracleFactorTypeMap[factorType as FactorType]}"/>`;
	}).join('\n')}
	<property dbms="mysql" name="pk.type" value="VARCHAR(60)"/>
${Object.keys(MySQLFactorTypeMap).map(factorType => {
		return `\t<property dbms="mysql" name="${factorType}.type" value="${MySQLFactorTypeMap[factorType as FactorType]}"/>`;
	}).join('\n')}
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<not>
				<tableExists tableName="TOPIC_${topicName}"/>
			</not>
        </preConditions>
        <createTable tableName="TOPIC_${topicName}">
			<column name="ID_" type="\${pk.type}">
				<constraints primaryKey="true"/>
			</column>
${topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
		return `			<column name="${asFactorName(factor)}" type="\${${factor.type}.type}"/>`;
	}).join('\n')}
        </createTable>
	</changeSet>
	
	<!-- add or modify columns -->
${topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
		const factorColumnName = asFactorName(factor);
		return `	<!-- add ${factorColumnName} when column not exists -->
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
        <addColumn tableName="TOPIC_${topicName}">
        	<column name="${factorColumnName}" type="\${${factor.type}.type}"/>
		</addColumn>
    </changSet>
    <!-- modify ${factorColumnName} when column exists -->
    <changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="1">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="1">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = 'TOPIC_${topicName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
        <modifyDataType tableName="TOPIC_${topicName}" columnName="${factorColumnName}" newDataType="\${${factor.type}.type}"/>
    </changSet>
	`;
	}).join('\n')}
	
	<!-- drop exists indexes and add new indexes -->
	<changeSet id="${v4()}" author="watchmen">
		<createProcedure dbms="oracle" procedureName="SCHEMA_CHANGE">
			CREATE OR REPLACE PROCEDURE SCHEMA_CHANGE AS
				CURSOR cursorIndexes IS SELECT UI.INDEX_NAME
					FROM USER_INDEXES UI
					WHERE UI.TABLE_NAME = 'TOPIC_${topicName}'
                        AND NOT EXISTS (SELECT 1 FROM USER_CONSTRAINTS WHERE TABLE_NAME = 'TOPIC_${topicName}' AND CONSTRAINT_TYPE = 'P' AND CONSTRAINT_NAME = UI.INDEX_NAME);
			BEGIN
				-- drop existed indexes
				FOR anIndex in cursorIndexes LOOP
					EXECUTE IMMEDIATE CONCAT('DROP INDEX ', anIndex.INDEX_NAME);
				END LOOP;
			END;
		</createProcedure>
		<createProcedure dbms="mysql" procedureName="SCHEMA_CHANGE">
			DELIMITER $$
			CREATE PROCEDURE SCHEMA_CHANGE() 
			BEGIN 
				-- drop existed indexes
				SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'TOPIC_${topicName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
				WHILE @indexName IS NOT NULL DO
				    SET @sql = concat('DROP INDEX ', @indexName, ' ON TOPIC_${topicName};');
					PREPARE stmt FROM @sql;
					EXECUTE stmt;
					DEALLOCATE PREPARE stmt;
					SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'TOPIC_${topicName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
				END WHILE;
			END $$
			DELIMITER ;
		</createProcedure>
		<sql dbms="oracle">CALL SCHEMA_CHANGE();</sql>
		<sql dbms="mysql">CALL \`SCHEMA_CHANGE\'();</sql>
		<dropProcedure procedureName="SCHEMA_CHANGE"/>
${Object.values(uniqueIndexes).map((factors, index) => {
		return `		<!-- unique index -->
		<createIndex indexName="U_${topicName}_${index + 1}" tableName="TOPIC_${topicName}" unique="true">
${factors.map(factor => `			<column name="${asFactorName(factor)}"/>`)}
		</createIndex>`;
	}).join('\n')}
${Object.values(indexes).map((factors, index) => {
		return `		<!-- index -->
		<createIndex indexName="I_${topicName}_${index + 1}" tableName="TOPIC_${topicName}">
${factors.map(factor => `			<column name="${asFactorName(factor)}"/>`)}
		</createIndex>`;
	}).join('\n')}
	</changSet>
</databaseChangeLog>`;
};

export const generateLiquibaseScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`liquibase/${filename}.xml`, createXML(topic));
	});
};