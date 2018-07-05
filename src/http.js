// export const APIENDPOINT = 'http://192.168.1.151:3000/'
// export const getHeader = function () {
//   const tokenData = JSON.parse(window.localStorage.getItem('amxUser'))
//   const headers = {
//     Accept: 'application/json',
//     Authorization: 'Bearer' + tokenData.access_token
//   }
//   return headers
// }
import axios from 'axios'
// let urlHttp = process.env.NODE_ENV === 'production' ? 'https' : 'http'
axios.defaults.baseURL = 'https://control-tesis-back.herokuapp.com'
// axios.defaults.withCredentials = true
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// let token = document.head.querySelector('meta[name="csrf-token"]')
// if (token) {
//   axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
// } else {
//   console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
// }
// axios.defaults.headers = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json',
// }
// axios.interceptors.request.use(config => {
//   // if (store.getters.currentUser.token) {
//   //   // ${store.getters.currentUser.token
//   //   config.headers.Authorization = `Token ${store.getters.currentUser.token}`
//   // }
//   return config
// }, err => {
//   console.log('error', err)
//   return Promise.reject(err)
// })
export default axios
