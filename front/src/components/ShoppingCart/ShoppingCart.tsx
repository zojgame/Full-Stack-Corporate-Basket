import { DeleteOutlined } from '@ant-design/icons';
import { Basket } from '../../types/types';
import { Tooltip, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { globalStore } from '../../store/store';

export const ShoppingCart = ({basket} : {basket: Basket}) => {
    const navigate = useNavigate();
    const onClickShoppingCart = () => {
        navigate(`../basket/${basket._id}`)
    }

    const onBtnClickHandle = (e:any) => {
        e.stopPropagation(); 
        var textField = document.createElement('textarea')
        textField.innerText = `http://localhost:5173/basket/${basket._id}`
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    const onDeleteClickHandle = (evt:any) => {
        evt.stopPropagation();     
        globalStore.deleteCurrentBasket(basket._id).then(() => 
            {
                notification.open({message: 'Корзина удалена'})
            }        
        );
    }

   return (       
        <div className="shopping-cart" onClick={onClickShoppingCart}>
            
            <p>{basket.basket_name}</p>
            {basket.public ? 
            <Tooltip title={`Скопировать ссылку`}>
                <Button onClick={onBtnClickHandle}>
                    Поделиться корзиной
                </Button>
                 
            </Tooltip> : <div></div>}
            <p>{basket.items.reduce((acc, prev) => Number(prev.price) + acc, 0)}</p>
            <Button onClick={onDeleteClickHandle}>
                <DeleteOutlined style={{fontSize: '25px'}} />                
            </Button>
        </div>
   );
};
