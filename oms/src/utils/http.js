import axios from 'axios';
import { JWT_LOCALSTORAGE_KEY } from '@/config/api';

let tokenData = {};
try {
  tokenData = JSON.parse(localStorage.getItem('tokenInfo')).token;
} catch (e) {
  if (window) { window.console.log(e); }
}

const getLongToken = () => localStorage.getItem(JWT_LOCALSTORAGE_KEY);

const handleErr = (err) => {
  if (err.response.status.toString().match(/401|403|407/)) {
    /* eslint no-restricted-globals: 0 */
    if (location) {
      location.href = '/login';
    }
  }
  const { response = {} } = err;
  return {
    ...err,
    errStatus: response.status,
    errMessage: response.data ? response.data.message : '未知错误',
    status: response.status,
    data: response.data,
  };
};

const httpRequest = axios.create({
  headers: {
    Authorization: `Bearer ${tokenData.access_token}`,
  },
  withCredentials: false,
});

// 长token请求
const httpLongTokenReq = axios.create({
  timeout: 5e3,
  headers: {
    Authorization: `Bearer ${getLongToken()}`,
  },
  withCredentials: false,
});

httpLongTokenReq.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getLongToken()}`;
  return config;
});

// token过期或者未登录用户跳转Login
httpRequest.interceptors.response.use(res => res, err => handleErr(err));

httpLongTokenReq.interceptors.response.use(res => res, err => handleErr(err));

export { httpRequest, httpLongTokenReq };
