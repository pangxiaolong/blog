import request from '@/utils/request'

const baseURL = 'http://118.126.111.172:7001'
const getPlanList = (params) => request({ baseURL, url: '/plan/getPlan', method: 'get', params })
const addPlan = (params) => request({ baseURL, url: '/plan/addPlan', method: 'post', data: params })
const editPlan = (params) => request({ baseURL, url: '/plan/editPlan', method: 'put', data: params })
const deletePlan = (params) => request({ baseURL, url: '/plan/deletePlan', method: 'delete', params })
const addClassify = (params) => request({ baseURL, url: '/classify/addClassify', method: 'post', data: params })
const getClassify = (params) => request({ baseURL, url: '/classify/getClassify', method: 'get', data: params })
const editClassify = (params) => request({ baseURL, url: '/classify/editClassify', method: 'put', data: params })
const deleteClassify = (params) => request({ baseURL, url: '/classify/delClassify', method: 'delete', params })
const addNote = (params) => request({ baseURL, url: '/note/addNote', method: 'post', data: params })
const getNote = (params) => request({ baseURL, url: '/note/getNote', method: 'get', data: params })
const delNote = (params) => request({ baseURL, url: '/note/delNote', method: 'delete', params })
const statisticsNote = (params) => request({ baseURL, url: '/note/statisticsNote', method: 'get', params })
const groupNote = (params) => request({ baseURL, url: '/note/groupNote', method: 'get', params })

export {
  getPlanList,
  addPlan,
  editPlan,
  deletePlan,
  addClassify,
  getClassify,
  editClassify,
  deleteClassify,
  addNote,
  getNote,
  delNote,
  statisticsNote,
  groupNote
}
