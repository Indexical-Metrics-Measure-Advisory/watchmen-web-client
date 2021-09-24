export const isDataQualityCenterEnabled = () => process.env.REACT_APP_DQC_ENABLED === 'true';
export const isPipelinesDownloadEnabled = () => process.env.REACT_APP_PIPELINES_DOWNLOAD === 'true';
export const isMultipleDataSourcesEnabled = () => process.env.REACT_APP_MULTIPLE_DATA_SOURCES === 'true';
export const isReportFilterEnabled = () => process.env.REACT_APP_REPORT_FILTER === 'true';
export const isSpaceFilterEnabled = () => process.env.REACT_APP_SPACE_FILTER === 'true';
export const isDynamicReportFilterEnabled = () => process.env.REACT_APP_DYNAMIC_REPORT_FILTER === 'true';