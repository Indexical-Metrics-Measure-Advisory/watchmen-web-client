import {ExternalWriter, ExternalWriterType} from '@/services/data/tuples/external-writer-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createExternalWriter = (): ExternalWriter => {
	return {
		writerId: generateUuid(),
		writerCode: '',
		type: ExternalWriterType.ELASTIC_SEARCH_WRITER,
		url: '',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};
