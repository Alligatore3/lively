import { LIVELY_BASE_URL } from '@/constants';

export const generateLivelyEndpoint = (path: string) => `${LIVELY_BASE_URL}${path}`;
