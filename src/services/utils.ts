import dayjs from 'dayjs';

export const isMockService = (): boolean => process.env.REACT_APP_SERVICE_MOCK_FLAG === 'true';
export const getServiceHost = (): string => process.env.REACT_APP_SERVICE_URL!;

export const getCurrentTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
