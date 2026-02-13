import axios, { type InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
})

axiosInstance.interceptors.request.use(function (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  config.headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_TOKEN}`)
  return config
})

export default axiosInstance
