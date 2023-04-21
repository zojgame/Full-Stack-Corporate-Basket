// const URL = 'http://localhost:8080/basket/getCurrent/64366699c9ab47662d5c7e3c'
const URL = 'http://127.0.0.1:8080'
import axios from "axios"
import { globalStore } from "../store/store";
import { redirect } from "react-router-dom";
import { notification } from "antd";

export const getUsers = async () => {
    try {
        const response = await axios
        .get(`${URL}/basket/baskets`)
        .then(res => res.data)
        .catch(err => console.error(err));

        return response;
        
    } catch (error) {
        console.error(error)
    }
}



export const createUser = async (userName, password) => {    
        const response = await axios.post(`${URL}/auth/registration`, {
            username: userName,
            password: password
        })
        .then(res => globalStore.setMessage(res.data.message))
        .catch(err => globalStore.setMessage(err.response.data.message))

        return response;
}

export const authUser = async (userName, password) => {    
        const response = await axios.post(`${URL}/auth/login`, {
            username: userName,
            password: password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', userName)
            globalStore.authUser()
            globalStore.setMessage(res.data.message)
        })
        .catch(err => {
            globalStore.setMessage(err.response.data.message)
            globalStore.logoutUser()
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        })

        return response;
}

export const getUserBaskets = async () => {
    try {
        const userName = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/basket/getUserBaskets/${userName}`, 
        {
            headers: {
            Authorization: `Bearer ${token}`            
        }})
    
        return response
        
    } catch (error) {
        return error;
    }
}

export const checkAuthUser = async () => {  
    const token = localStorage.getItem('token');
    const res = await axios.post(`${URL}/auth/checkAuth`, {}, {
        headers: {
            authorization: `Bearer ${token}`
        }
     })
     .then(res => {
        globalStore.authUser()
         globalStore.setMessage('Пользователь авторизован')
         localStorage.setItem('token', token)
         console.log('res')
     })
     .catch(err => {
         globalStore.logoutUser();
         
         globalStore.setMessage('Пользователь не авторизован')
         localStorage.removeItem('user')
         localStorage.removeItem('token')
         console.log('err')
         
     })

     return res;
}

export const createBasket = async (title, isPublic, items) => {
    const token = localStorage.getItem('token') 
    const response = await axios.post(`${URL}/basket/createBasket`, {
        owner: `${localStorage.getItem('user')}`,
        items: items,
        isPublic: isPublic,
        name: title
    }, 
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        globalStore.setMessage('Корзина создана1')})
    .catch(err => globalStore.setMessage(`Ошибка ${err}`))

    return response;
      
}

// export const getCurrentBasket = async (basketId) => {
//     try {
//         const response = await axios
//         .get(`${URL}/basket/getCurrent/${basketId}`)
//         .then(res => res.data)
//         .catch(err => console.error(err));

//         return response;
        
//     } catch (error) {
//         console.error(error)
//     }
// }

export const getCurrentUserBasket = async(id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}/basket/getCurrent/${id}`, {headers: {
            Authorization: `Bearer ${token}`            
        }})

    return response;
}
