import axios from 'axios';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const accessToken = window.localStorage.getItem('accessToken');

if (accessToken) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;