import $http from "../api/http.js"

// 个人中心
export const api = (params, _this) => $http('', params, _this);