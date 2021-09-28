import {DataSource} from '../tuples/data-source-types';
import {ExternalWriter} from '../tuples/external-writer-types';
import {Pipeline, PipelinesGraphics} from '../tuples/pipeline-types';
import {Topic} from '../tuples/topic-types';

export interface PipelinesSettings {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: Array<PipelinesGraphics>;
	dataSources: Array<DataSource>;
	externalWriters: Array<ExternalWriter>;
}