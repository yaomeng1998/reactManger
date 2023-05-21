import axios from 'axios'
// var baseUrl = 'http://localhost:3000'
var baseUrl='/api'

//登录
export function login(data) {
    return axios.post(baseUrl + '/login', data)
}
//获取列表
export function getFirstList(params) {
    return axios.get(baseUrl + '/manage/category/list', {
        params: 0
    })
}
//获取列表
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
//根据分类ID获取分类
export function getCategoryById(params) {
    return axios.get(baseUrl + '/manage/category/info', {
        params: params
    })
}
//删除分类
export function deleteCategory(data) {
    return axios.post(baseUrl + '/manage/category/delete',data)
}
//修改status
export function modifyStatus(data) {
    return axios.post(baseUrl + '/manage/product/updateStatus',data)
}
//添加商品
export function addProduct(data) {
    return axios.post(baseUrl + '/manage/product/add',data)
}
//删除图片
export function deleteImg(data) {
    return axios.post(baseUrl + '/manage/img/delete',data)
}
//删除商品
export function deleteProduct(data) {
    return axios.post(baseUrl + '/manage/product/delete',data)
}
//更新商品
export function updateProduct(data) {
    return axios.post(baseUrl + '/manage/product/update',data)
}
//更新商品
export function getRoles() {
    return axios.get(baseUrl + '/manage/role/list')
}
//添加角色
export function addRole(data) {
    return axios.post(baseUrl + '/manage/role/add',data)
}
//更新角色
export function updateRole(data) {
    return axios.post(baseUrl + '/manage/role/update',data)
}
//更新角色
export function deleteRole(data) {
    return axios.post(baseUrl + '/manage/role/delete',data)
}
//获取用户
export function getUsers() {
    return axios.get(baseUrl + '/manage/user/list')
}
//添加用户
export function addUser(data) {
    return axios.post(baseUrl + '/manage/user/add',data)
}
//更新用户
export function updateUser(data) {
    return axios.post(baseUrl + '/manage/user/update',data)
}
//删除用户
export function deleteUser(data) {
    return axios.post(baseUrl + '/manage/user/delete',data)
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