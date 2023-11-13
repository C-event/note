import Cookies from 'js-cookie'
// 建议自己重新写一个名称！
const TokenKey = 'vue-admin'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
