import JSZip from 'jszip';
import {Topic, TopicType} from '../../../services/tuples/topic-types';
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
	getUpdateTimeColumnName,
	getVersionColumnName
} from './utils';
import {OracleFactorTypeMap} from './oracle';
import {Factor, FactorType} from '../../../services/tuples/factor-types';
import {MySQLFactorTypeMap} from './mysql';
import {v4} from 'uuid';

const buildFactorsOnCreate = (topic: Topic) => {
	if (topic.type === TopicType.RAW) {
		return `			<column name="${getRawTopicDataColumnName()}" type="\${json-column.type}"/>`;
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return `			<column name="${asFactorName(factor)}" type="\${${factor.type}.type}"/>`;
		}).join('\n');
	}
};

const buildAggregateAssistOnCreate = (topic: Topic) => {
	return [TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type) ? `			<column name="${getAggregateAssistColumnName()}" type="\${aggregate-assist-column.type}"/>` : '';
};
const buildVersionOnCreate = (topic: Topic) => {
	return [TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type) ? `			<column name="${getVersionColumnName()}" type="\${version-column.type}"/>` : '';
};
const buildAuditColumnOnCreate = (topic: Topic, columnName: string) => {
	return `			<column name="${columnName}" type="\${audit-column.type}"/>`;
};

const buildFactorOnModify = (topic: Topic, factor: Factor) => {
	const tableName = asFullTopicName(topic);
	const factorColumnName = asFactorName(factor);

	return `\t<!-- add ${factorColumnName} when column not exists -->
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${factorColumnName}" type="\${${factor.type}.type}"/>
		</addColumn>
    </changSet>
    <!-- modify ${factorColumnName} when column exists -->
    <changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="1">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="1">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${factorColumnName}'</sqlCheck>
        </preConditions>
        <modifyDataType tableName="${tableName}" columnName="${factorColumnName}" newDataType="\${${factor.type}.type}"/>
    </changSet>`;
};
const buildFactorsOnModify = (topic: Topic) => {
	if (topic.type === TopicType.RAW) {
		// fake me as a factor, therefore use this build function
		return buildFactorOnModify(topic, {name: getRawTopicDataColumnName(), type: 'json'} as unknown as Factor);
	} else {
		return topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
			return buildFactorOnModify(topic, factor);
		}).join('\n');
	}
};

const buildAggregateAssistOnModify = (topic: Topic) => {
	if (![TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type)) {
		return '';
	}

	const tableName = asFullTopicName(topic);
	return `\t<!-- add ${getAggregateAssistColumnName()} when column not exists -->
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${getAggregateAssistColumnName()}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${getAggregateAssistColumnName()}" type="\${aggregate-assist-column.type}"/>
		</addColumn>
    </changSet>
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${getAggregateAssistColumnName()}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${getAggregateAssistColumnName()}" type="\${aggregate-assist-column.type}"/>
		</addColumn>
    </changSet>`;
};
const buildVersionOnModify = (topic: Topic) => {
	if (![TopicType.AGGREGATE, TopicType.TIME, TopicType.RATIO].includes(topic.type)) {
		return '';
	}

	const tableName = asFullTopicName(topic);
	return `\t<!-- add ${getVersionColumnName()} when column not exists -->
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${getVersionColumnName()}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${getVersionColumnName()}" type="\${version-column.type}"/>
		</addColumn>
    </changSet>
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${getVersionColumnName()}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${getVersionColumnName()}" type="\${version-column.type}"/>
		</addColumn>
    </changSet>`;
};
const buildAuditColumnOnModify = (topic: Topic, columnName: string) => {
	const tableName = asFullTopicName(topic);
	return `\t<!-- add ${columnName} when column not exists -->
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="mysql"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${columnName}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${columnName}" type="\${audit-column.type}"/>
		</addColumn>
    </changSet>
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<dbms type="oracle"/>
			<sqlCheck expectedResult="0">SELECT COUNT(1) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${columnName}'</sqlCheck>
        </preConditions>
        <addColumn tableName="${tableName}">
        	<column name="${columnName}" type="\${audit-column.type}"/>
		</addColumn>
    </changSet>`;
};

const createXML = (topic: Topic) => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const tableName = asFullTopicName(topic);
	const uniqueIndexName = asUniqueIndexName(topic);
	const indexName = asIndexName(topic);

	return `<?xml version="1.0" encoding="UTF-8"?>  
<databaseChangeLog  
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"  
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">
	<property dbms="oracle" name="pk-column.type" value="VARCHAR2(60)"/>
	<property dbms="oracle" name="json-column.type" value="CLOB"/>
	<property dbms="oracle" name="aggregate-assist-column.type" value="VARCHAR2(1024)"/>
	<property dbms="oracle" name="version-column.type" value="NUMBER(8)"/>
	<property dbms="oracle" name="audit-column.type" value="DATE"/>
${Object.keys(OracleFactorTypeMap).map(factorType => {
		return `\t<property dbms="oracle" name="${factorType}.type" value="${OracleFactorTypeMap[factorType as FactorType]}"/>`;
	}).join('\n')}
	<property dbms="mysql" name="pk-column.type" value="VARCHAR(60)"/>
	<property dbms="mysql" name="json-column.type" value="JSON"/>
	<property dbms="mysql" name="aggregate-assist-column.type" value="JSON"/>
	<property dbms="mysql" name="version-column.type" value="INT"/>
	<property dbms="mysql" name="audit-column.type" value="DATETIME"/>
${Object.keys(MySQLFactorTypeMap).map(factorType => {
		return `\t<property dbms="mysql" name="${factorType}.type" value="${MySQLFactorTypeMap[factorType as FactorType]}"/>`;
	}).join('\n')}
	<changeSet id="${v4()}" author="watchmen">
		<preConditions onFail="MARK_RAN">
			<not>
				<tableExists tableName="${tableName}"/>
			</not>
        </preConditions>
        <createTable tableName="${tableName}">
			<column name="${getIdColumnName()}" type="\${pk-column.type}">
				<constraints primaryKey="true"/>
			</column>
${buildFactorsOnCreate(topic)}
${buildAggregateAssistOnCreate(topic)}
${buildVersionOnCreate(topic)}
${buildAuditColumnOnCreate(topic, getInsertTimeColumnName())}
${buildAuditColumnOnCreate(topic, getUpdateTimeColumnName())}
        </createTable>
	</changeSet>
	
	<!-- add or modify columns -->
${buildFactorsOnModify(topic)}
${buildAggregateAssistOnModify(topic)}
${buildVersionOnModify(topic)}
${buildAuditColumnOnModify(topic, getInsertTimeColumnName())}
${buildAuditColumnOnModify(topic, getUpdateTimeColumnName())}
	
	<!-- drop exists indexes and add new indexes -->
	<changeSet id="${v4()}" author="watchmen">
		<!-- simply change the following sql of pre-conditions to "SELECT 0 FROM DUAL" to drop all exists indexes. -->
		<!-- considering performance of rebuild indexes, manually drop useless indexes accurate is recommended. -->
		<!-- according to duplication check of index names, following create scripts need to be adjusted manually as well. -->
		<preConditions onFail="MARK_RAN">
			<sqlCheck expectedResult="0">SELECT 1 FROM DUAL</sqlCheck>
		</preConditions>
		<createProcedure dbms="oracle" procedureName="SCHEMA_CHANGE">
			CREATE OR REPLACE PROCEDURE SCHEMA_CHANGE AS
				CURSOR cursorIndexes IS SELECT UI.INDEX_NAME
					FROM USER_INDEXES UI
					WHERE UI.TABLE_NAME = '${tableName}'
                        AND NOT EXISTS (SELECT 1 FROM USER_CONSTRAINTS WHERE TABLE_NAME = '${tableName}' AND CONSTRAINT_TYPE = 'P' AND CONSTRAINT_NAME = UI.INDEX_NAME);
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
				SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
				WHILE @indexName IS NOT NULL DO
				    SET @sql = concat('DROP INDEX ', @indexName, ' ON ${tableName};');
					PREPARE stmt FROM @sql;
					EXECUTE stmt;
					DEALLOCATE PREPARE stmt;
					SELECT INDEX_NAME INTO @indexName FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}' AND INDEX_NAME <> 'PRIMARY' LIMIT 1;
				END WHILE;
			END $$
			DELIMITER ;
		</createProcedure>
		<sql dbms="oracle">CALL SCHEMA_CHANGE();</sql>
		<sql dbms="mysql">CALL \`SCHEMA_CHANGE\`();</sql>
		<dropProcedure procedureName="SCHEMA_CHANGE"/>
	</changSet>
	<changeSet id="${v4()}" author="watchmen">
${Object.values(uniqueIndexes).map((factors, index) => {
		return `		<!-- unique index -->
		<createIndex indexName="${uniqueIndexName}_${index + 1}" tableName="${tableName}" unique="true">
${factors.map(factor => `			<column name="${asFactorName(factor)}"/>`)}
		</createIndex>`;
	}).join('\n')}
${Object.values(indexes).map((factors, index) => {
		return `		<!-- index -->
		<createIndex indexName="${indexName}_${index + 1}" tableName="${tableName}">
${factors.map(factor => `			<column name="${asFactorName(factor)}"/>`)}
		</createIndex>`;
	}).join('\n')}
	</changeSet>
</databaseChangeLog>`;
};

export const generateLiquibaseScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`liquibase/${filename}.xml`, createXML(topic));
	});
};