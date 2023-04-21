const Router = require('express')
const controller = require('../controllers/basketController');

const router = new Router();
const authMiddleWare = require('../middleware/authMiddleWare');

router.post('/createBasket', authMiddleWare, controller.createBasket);

router.get('/baskets', authMiddleWare, controller.getAllBasket);

router.get('/getCurrent/:id', authMiddleWare, controller.getBasket);

router.delete('/delete/:id', authMiddleWare, controller.delete);

router.post('/update/:id', authMiddleWare, controller.update);

router.get('/getUserBaskets/:username', authMiddleWare, controller.getUserBasket);

router.post('/createItem', authMiddleWare, controller.createItem);

router.get('/getItems', authMiddleWare, controller.getItems);

router.post('/item/delete', controller.deleteItem);

module.exports = router;

