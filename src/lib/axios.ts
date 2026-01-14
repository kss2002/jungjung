import axios from 'axios';

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: 'https://jungjung-backend.oursophy.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30초
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error('Network Error:', error.message);
    } else {
      // 요청 설정 중 에러
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);
