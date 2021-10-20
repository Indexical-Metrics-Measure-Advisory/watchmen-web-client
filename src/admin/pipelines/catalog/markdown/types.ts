import {DataSource} from '@/services/data/tuples/data-source-types';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';

export type DataSourcesMap = Record<string, DataSource>;
export type ExternalWritersMap = Record<string, ExternalWriter>;
export type EnumsMap = Record<string, QueryEnum>;
