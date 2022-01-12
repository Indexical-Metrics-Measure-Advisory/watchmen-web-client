import {MonitorRules} from '@/services/data/data-quality/rule-types';
import {DataSource, DataSourceId} from '@/services/data/tuples/data-source-types';
import {EnumId} from '@/services/data/tuples/enum-types';
import {ExternalWriter, ExternalWriterId} from '@/services/data/tuples/external-writer-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {TopicId} from '@/services/data/tuples/topic-types';

export type DataSourcesMap = Record<DataSourceId, DataSource>;
export type ExternalWritersMap = Record<ExternalWriterId, ExternalWriter>;
export type EnumsMap = Record<EnumId, QueryEnum>;
export type MonitorRulesMap = Record<TopicId, MonitorRules>
