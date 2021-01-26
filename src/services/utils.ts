export const isMockService = (): boolean => process.env.REACT_APP_SERVICE_MOCK_FLAG === 'true';
export const getServiceHost = (): string => process.env.REACT_APP_SERVICE_URL!;