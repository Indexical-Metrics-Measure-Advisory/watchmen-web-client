import {DataSource} from '@/services/data/tuples/data-source-types';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';

export type DataSourcesMap = { [key in string]: DataSource };
export type ExternalWritersMap = { [key in string]: ExternalWriter };
export type EnumsMap = { [key in string]: QueryEnum };
