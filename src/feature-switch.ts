export const isDataQualityCenterEnabled = () => process.env.REACT_APP_DQC_ENABLED === 'true';
export const isPipelinesDownloadEnabled = () => process.env.REACT_APP_PIPELINES_DOWNLOAD === 'true';
export const isMultipleDataSourcesEnabled = () => process.env.REACT_APP_MULTIPLE_DATA_SOURCES === 'true';