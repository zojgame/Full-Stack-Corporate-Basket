import { makeAutoObservable, configure } from 'mobx';
import { Basket, Item } from '../types/types';
import axios from 'axios';


class Store {
    toastMessage: String = '';
    isUserAuth: Boolean = false;
    userBaskets : Basket[] = [];
    currentPageItems : Item[] = [];


    constructor(){
        makeAutoObservable(this);
    }

    setMessage(message: string){
        this.toastMessage = message
    }

    setCurrentPageItems(items : Item[]){
        this.currentPageItems = items;
    }

    authUser(){
        this.isUserAuth = true;
    }

    logoutUser(){
        this.isUserAuth = false;
    }

    setCurrentUserBaskets(userBaskets : Basket[]){
        this.userBaskets = userBaskets
    }

    async getCurrentUserBaskets(){
        try {
            const userName = localStorage.getItem('user')
            const token = localStorage.getItem('token')
            const response = await axios.get(`http://localhost:8080/basket/getUserBaskets/${userName}`, {headers: {
                Authorization: `Bearer ${token}`            
            }}).then(json => {this.userBaskets = json.data})
        
            return response
            
        } catch (error) {
            console.log(error)
            return error;
        }
    }   

    async updateBasket(basketId: String, items: Item[]){
        const URL = `http://localhost:8080/basket/update/${basketId}`;
        const token = localStorage.getItem('token')
        await this.getCurrentUserBaskets(); 
        let newUserBaskets = this.userBaskets.filter(basket => basket._id !== basketId);
        try {
            const response = await axios.post(URL, {items: items}, {headers: {
                Authorization: `Bearer ${token}`
            }}).then(res => {
                newUserBaskets = [...newUserBaskets, res.data.basket]
                this.userBaskets = newUserBaskets;
                const items = newUserBaskets.filter(bask => bask._id === basketId)[0].items;
                this.setCurrentPageItems(items);
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    
}

configure({
    enforceActions: "never",
})

export const globalStore = new Store();