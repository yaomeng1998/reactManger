import axios from 'axios'
var baseUrl = 'http://localhost:3000'

//登录
export function login(data) {
    return axios.post(baseUrl + '/login', data)
}
//获取一级列表
export function getFirstList(params) {
    return axios.get(baseUrl + '/manage/category/list', {
        params: params
    })
}
//获取二级列表
export function getSecondList(params) {
    return axios.get(baseUrl + '/manage/category/list', {
        params: params
    })
}
//添加一级
export function addList(data) {
    return axios.post(baseUrl + '/manage/category/add', data)
}
//更新一级
export function updateFirstList(data) {
    return axios.post(baseUrl + '/manage/category/update', data)
}
//获取商品分页列表
export function getPaginationList(params) {
    return axios.get(baseUrl + '/manage/product/list', {
        params: params
    })
}
//搜索商品分页列表
export function getSeacch(params) {
    const { pageNum, pageSize, searchType, searchName } = params
    return axios.get(baseUrl + '/manage/product/search', {
        params: {
            pageNum: 1,
            pageSize: 7,
            [searchType]: searchName
        }
    })
}