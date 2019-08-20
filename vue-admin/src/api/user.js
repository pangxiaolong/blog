import request from '@/utils/request'

export function login(data) {
  return request({
    baseURL: 'http://127.0.0.1:7001',
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getUser(param) {
  return request({
    baseURL: 'http://127.0.0.1:7001',
    url: '/user/getUser',
    method: 'get',
    params: { param }
  })
}
