import {ExternalWriter} from '@/services/data/tuples/external-writer-types';

export enum ExternalWriterEventTypes {
	EXTERNAL_WRITER_CODE_CHANGED = 'external-writer-name-changed',
	EXTERNAL_WRITER_TENANT_CHANGED = 'external-writer-tenant-changed',
	EXTERNAL_WRITER_TYPE_CHANGED = 'external-writer-type-changed',
	EXTERNAL_WRITER_CONNECT_PROP_CHANGED = 'external-writer-connect-prop-changed',
}

export interface ExternalWriterEventBus {
	fire(type: ExternalWriterEventTypes.EXTERNAL_WRITER_CODE_CHANGED, dataSource: ExternalWriter): this;
	on(type: ExternalWriterEventTypes.EXTERNAL_WRITER_CODE_CHANGED, listener: (dataSource: ExternalWriter) => void): this;
	off(type: ExternalWriterEventTypes.EXTERNAL_WRITER_CODE_CHANGED, listener: (dataSource: ExternalWriter) => void): this;

	fire(type: ExternalWriterEventTypes.EXTERNAL_WRITER_TENANT_CHANGED, dataSource: ExternalWriter): this;
	on(type: ExternalWriterEventTypes.EXTERNAL_WRITER_TENANT_CHANGED, listener: (dataSource: ExternalWriter) => void): this;
	off(type: ExternalWriterEventTypes.EXTERNAL_WRITER_TENANT_CHANGED, listener: (dataSource: ExternalWriter) => void): this;

	fire(type: ExternalWriterEventTypes.EXTERNAL_WRITER_TYPE_CHANGED, dataSource: ExternalWriter): this;
	on(type: ExternalWriterEventTypes.EXTERNAL_WRITER_TYPE_CHANGED, listener: (dataSource: ExternalWriter) => void): this;
	off(type: ExternalWriterEventTypes.EXTERNAL_WRITER_TYPE_CHANGED, listener: (dataSource: ExternalWriter) => void): this;

	fire(type: ExternalWriterEventTypes.EXTERNAL_WRITER_CONNECT_PROP_CHANGED, dataSource: ExternalWriter): this;
	on(type: ExternalWriterEventTypes.EXTERNAL_WRITER_CONNECT_PROP_CHANGED, listener: (dataSource: ExternalWriter) => void): this;
	off(type: ExternalWriterEventTypes.EXTERNAL_WRITER_CONNECT_PROP_CHANGED, listener: (dataSource: ExternalWriter) => void): this;
}