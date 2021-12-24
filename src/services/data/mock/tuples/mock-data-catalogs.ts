import {Catalog} from '../../tuples/catalog-types';
import {getCurrentTime} from '../../utils';
import {RawEndorsement, RawQuotation} from './mock-data-topics';

export const CATALOG_RAW_TOPICS_ID = '1';
export const CATALOG_TIME_TOPICS = '2';

export const CatalogRawTopics: Catalog = {
	catalogId: CATALOG_RAW_TOPICS_ID,
	name: 'Raw Topics',
	topicIds: [RawQuotation.topicId, RawEndorsement.topicId],
	techOwnerId: '1',
	bizOwnerId: '2',
	tags: ['raw'],
	description: 'All raw topics',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};