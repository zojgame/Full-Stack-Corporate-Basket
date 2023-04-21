const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator');
const {sercet} = require('../config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, sercet, {expiresIn: '24h'})
}

class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({message: "Ошибка при регистрации", errors: errors})
            }

            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "Пользователь уже существует"})
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username: username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.status(200).json({message: 'Пользователь успешно создан, перейдите на страницу авторизации'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Ошибка регистрации"})
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if(!candidate){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, candidate.password)
            if(!validPassword){
                return res.status(400).json({message: `Неправильные данные входа`})
            }

            const token = generateAccessToken(candidate._id, candidate.roles);
            return res.json({token: token, message: 'Вы успешно вошли'})

        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res){
        try {        
            const users = await User.find();
            res.json(users)    
        } catch (error) {
            
        }
    }
    
    async checkAuth(req, res){    
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            const decodedData = jwt.verify(token, sercet)
            req.user = decodedData
            return res.status(200).json({message: 'Пользователь авторизован'})
            
        } catch (error) {
            // console.log(error);
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
    }
}

module.exports = new authController()