const Router = require('express')
const controller = require('../controllers/authController')
const router = new Router()
const {check} = require('express-validator');
const authMiddleWare = require('../middleware/authMiddleWare')


router.post('/registration', [
    check('username', "Имя пользователя не должно быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4").isLength({min: 5}),
    check('password', "Пароль не должен быть пустым").notEmpty(),
], controller.registration)

router.post('/login', controller.login)

router.get('/users', authMiddleWare, controller.getUsers)

router.post('/checkAuth', controller.checkAuth)

module.exports = router
