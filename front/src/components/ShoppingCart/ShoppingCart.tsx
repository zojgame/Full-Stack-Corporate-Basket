import {ShoppingCartOutlined} from '@ant-design/icons';
import { Basket } from '../../types/types';
import { Tooltip, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ShoppingCart = ({basket} : {basket: Basket}) => {
    const navigate = useNavigate();
    const onClickShoppingCart = () => {
        navigate(`../basket/${basket._id}`)
    }

    const onBtnClickHandle = () => {
        var textField = document.createElement('textarea')
        textField.innerText = `http://localhost:5173/basket/${basket._id}`
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
   return (       
        <div className="shopping-cart" onClick={onClickShoppingCart}>
            <p>{basket.basket_name}</p>
            {basket.public ? 
            <Tooltip title={`Скопировать ссылку`}>
                <Button onClick={onBtnClickHandle}>
                    Поделиться корзиной
                </Button>
                 
            </Tooltip> : <></>}
            <p>{basket.items.reduce((acc, prev) => Number(prev.price) + acc, 0)}</p>
            <ShoppingCartOutlined style={{fontSize: '40px'}}/>
        </div>
   );
};
