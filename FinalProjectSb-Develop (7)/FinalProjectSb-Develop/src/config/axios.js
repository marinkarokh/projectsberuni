import axios from 'axios'
// import { API_TOKEN } from '../redux/constants';
// import { LOCAL_TOKEN } from '../redux/constants';


const localToken = 'localToken'
let LOCAL_TOKEN = localStorage.getItem(localToken)
export const axiosInstance = axios.create({
  baseURL: 'https://api.react-learning.ru/',
  headers: { authorization: `Bearer ${LOCAL_TOKEN}`}
});

axiosInstance.interceptors.response.use(
  (response) => {
    if(response.request.responseURL === 'https://api.react-learning.ru/signin'){
      axiosInstance.defaults.headers.authorization = `Bearer ${response.data.token}`
  }
  return response
  },
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    alert(error.response.data.message)
  });
