export default {

saveUser(user){
    localStorage.setItem('user_key',JSON.stringify(user))
},

getUser(){
    return JSON.parse(localStorage.getItem('user_key') || '{}')
},

removeUser(){
    localStorage.removeItem('user_key')
}
}