import {Topic} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {asFactorName, asTopicName, gatherIndexes, gatherUniqueIndexes} from './utils';
import {OracleFactorTypeMap} from './oracle';

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);
	const topicName = asTopicName(topic);

	return `-- sqls for topic[id=${topic.topicId}, name=${topic.name}]
-- drop, commented default
-- DROP TABLE TOPIC_${topicName};

-- create 
CREATE TABLE TOPIC_${topicName}(
	ID_ VARCHAR2(60),
${topic.factors.filter(factor => factor.name.indexOf('.') === -1).map(factor => {
		return `    ${asFactorName(factor)} ${OracleFactorTypeMap[factor.type]},\n`;
	}).join('')}
	-- primary key
	PRIMARY KEY (ID_)
);

-- unique index
${Object.values(uniqueIndexes).map((factors, index) => {
		return `CREATE UNIQUE INDEX U_${topicName}_${index + 1} ON TOPIC_${topicName}(${factors.map(factor => asFactorName(factor)).join(', ')}),`;
	})}

-- index
${Object.values(indexes).map((factors, index) => {
		return `CREATE INDEX I_${topicName}_${index + 1} ON TOPIC_${topicName}(${factors.map(factor => asFactorName(factor)).join(', ')}),`;
	})}

`;
};

export const generateOracleCreateSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = asTopicName(topic);
		zip.file(`oracle/sql/creation/${filename}.sql`, createSQL(topic));
	});
};