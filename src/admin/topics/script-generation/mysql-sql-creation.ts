import {Topic} from '../../../services/tuples/topic-types';
import JSZip from 'jszip';
import {gatherIndexes, gatherUniqueIndexes} from './utils';
import {MySQLFactorTypeMap} from './mysql';

const createSQL = (topic: Topic): string => {
	const uniqueIndexes = gatherUniqueIndexes(topic);
	const indexes = gatherIndexes(topic);

	return `-- sqls for topic[id=${topic.topicId}, name=${topic.name}]
-- drop, commented default
-- DROP TABLE IF EXISTS TOPIC_${topic.name.toUpperCase()};

-- create 
CREATE TABLE TOPIC_${topic.name.toUpperCase()}(
	ID_ VARCHAR(60),
${topic.factors.map(factor => {
		return `    ${factor.name.toUpperCase()} ${MySQLFactorTypeMap[factor.type]},\n`;
	}).join('')}

	-- unique index
${Object.values(uniqueIndexes).map(factors => {
		return `UNIQUE INDEX (${factors.map(factor => factor.name.toUpperCase()).join(', ')}),`;
	})}

	-- index
${Object.values(indexes).map(factors => {
		return `INDEX (${factors.map(factor => factor.name.toUpperCase()).join(', ')}),`;
	})}

	-- primary key
	PRIMARY KEY (ID_)
);

`;
};

export const generateMySQLCreateSQLScripts = (zip: JSZip, topics: Array<Topic>) => {
	topics.forEach(topic => {
		const filename = (topic.name || topic.topicId).replaceAll(' ', '_').replaceAll('/', '_');
		zip.file(`mysql/sql/creation/${filename}.sql`, createSQL(topic));
	});
};