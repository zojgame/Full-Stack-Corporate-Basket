const User = require('../models/User');
const Basket = require('../models/Basket');
const Item = require('../models/Item')
const {mongoose, ObjectId} = require('mongoose')


class basketController{
    async createBasket(req, res){
        try {
            const {owner, items, isPublic, name} = req.body
            
            const user = await User.findOne({username: owner.username})
            if(user){
                return res.json({message: `Пользователь ${user.username} не найден`})
            }
            const basket = new Basket({first_owner: owner, owners: [owner], 
                items: items, public: isPublic, basket_name: name});
                await basket.save();
            
            return res.status(200).json({message: `Корзина ${basket.basket_name} успешно создана`, 
            url: `Ссылка на корзину: http://localhost:8080/basket/getCurrent/${basket._id}`})

        } catch (error) {
            console.log(error)
            return res.status(400).json({errorMessage:'Невозможно создать корзину'})
        }
        
    }

    async getBasket(req, res){
        try {
            const basket = await Basket.findById(req.params.id);
            res.json({data: basket})           
        } catch (error) {
            return res.status(400)  
            .json({ message: `Корзины не существует или ошибка параметров`, error: `${error}` });
        }
    }

    async delete(req, res){
        try {
            await Basket.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: 'корзина удалена'})
        } catch (error) {
            return res.status(404).json({message: 'message корзина не найдена', error: `${error}`})
        }
    }

    async getAllBasket(req, res){
        const baskets = await Basket.find();
        res.status(200).json(baskets);
    }

    async update(req, res){
        try {
            const basket = await Basket.findById(req.params.id);
            Object.assign(basket, req.body);
            basket.save();
            res.status(200).json({basket: basket})
        } catch (error) {
            res.status(400).json({message: 'Корзина не найдена'});
        }
        
    }

    async getUserBasket(req, res){
        try {
            const userName = req.params.username;
            const baskets = (await Basket.find())
            .filter(basket => basket.first_owner === userName)
            console.log(baskets)
            res.status(200).json(baskets)            
        } catch (error) {
            res.status(400).json({message: 'Пользователь не найден'})
            console.log(error)
        }
    }

    async createItem(req, res){
        try {
            const {title, price} = req.body;
            const item = new Item({title: title, price: price})
            item.save()

            res.json({message: `Товар ${title} успешно создан`})
        } catch (error) {
            res.json({message: `Ошибка ${error}`})
        }
    }

    async getItems(req, res){
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (error) {
            res.json({message: `Ошибка ${error}`})
        }
    }

    async deleteItem(req, res){
        const basketID = req.body.basketId;
        const itemID = new ObjectId(req.body.id);
        try {
            const currentBasket = await Basket.findById(basketID)           

            const currentItems = currentBasket.items.filter(item => item._id !== itemID)
            const newBasket = {...currentBasket, items: currentItems}
            Object.assign(currentBasket, newBasket);
            currentBasket.save();
            res.status(200).json({message: 'Товар успешно удалён'})
            
        } catch (error) {
            res.json({message: `Ошибка ${error}`})
        }
    }
}

module.exports = new basketController();