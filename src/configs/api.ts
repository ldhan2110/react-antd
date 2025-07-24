import { authService } from '../services/authService';

/**
 * Get runtime API configuration
 */
const getRuntimeConfig = () => {
  // @ts-expect-error - Runtime config injected by server
  return window.__RUNTIME_CONFIG__ || {};
};

/**
 * API Configuration with runtime support
 */
export const API_CONFIG = {
  get BASE_URL() {
    const config = getRuntimeConfig();
    return (
      config.VITE_API_URL ||
      process.env.REACT_APP_API_URL ||
      process.env.API_URL ||
      import.meta.env.VITE_API_URL ||
      'http://localhost:9000/api'
    );
  },
  ENDPOINTS: {
    INITIAL_STATE: '',
    CUSTOMER_LIST: '/api/client/{clientId}/object/get-list',
  },
};

/**
 * Get API URL with optional path
 */
export const getApiUrl = (path?: string): string => {
  const baseUrl = API_CONFIG.BASE_URL;
  return path ? `${baseUrl}${path}` : baseUrl;
};

/**
 * Replace path parameters in URL
 */
export const replacePathParams = (url: string, params: Record<string, string>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value);
  });
  return result;
};

export const getAccessToken = (): string | null => {
  return authService.getAccessToken();
};
