export const isDataQualityCenterEnabled = () => process.env.REACT_APP_DQC_ENABLED === 'true';
export const isPipelinesDownloadEnabled = () => process.env.REACT_APP_PIPELINES_DOWNLOAD === 'true';
export const isMultipleDataSourcesEnabled = () => process.env.REACT_APP_MULTIPLE_DATA_SOURCES === 'true';
export const isReportFilterEnabled = () => process.env.REACT_APP_REPORT_FILTER === 'true';
export const isReportFunnelEnabled = () => process.env.REACT_APP_REPORT_FUNNEL === 'true';
export const isSpaceFilterEnabled = () => process.env.REACT_APP_SPACE_FILTER === 'true';
export const isWriteExternalEnabled = () => process.env.REACT_APP_EXTERNAL_WRITER_ADAPTERS === 'true';
export const isIndicatorWorkbenchEnabled = () => process.env.REACT_APP_INDICATOR_WORKBENCH === 'true';
