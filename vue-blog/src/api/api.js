import axios from 'axios'

const baseURL = 'http://118.126.111.172:7001'
// const baseURL = 'http://127.0.0.1:7001'

export const getClassify = params => {
  return axios.get(`${baseURL}/classify/getClassify`, params).then(res => res.data)
}
export const getNote = params => {
  return axios.get(`${baseURL}/note/getNote`, {
    params
  }).then(res => res.data)
}
export const getPlanList = params => {
  return axios.get(`${baseURL}/plan/getPlan`, {
    params
  }).then(res => res.data)
}
