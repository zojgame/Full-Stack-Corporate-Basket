import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUserBasket } from "../../api/api";
import { Basket, Item } from "../../types/types";
import { ItemComponent } from "../../components";
import { notification, Button, Input, InputRef, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { globalStore } from "../../store/store";
import { useRef } from "react";

export const BasketPage = () => {
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [newItems, setNewItems] = useState<Item[]>([]);
    // const [basket, setBasket] = useState<Basket>();
    const navigate = useNavigate();
    const itemPrice = useRef<InputRef>(null);
    const itemTitle = useRef<InputRef>(null);
    const pageTitle = useRef<InputRef>(null);
    const [basketTitle, setBasketTitle] = useState('')

    useEffect(() => {
        getCurrentUserBasket(id)
        .then(json => {
            if(json.data.data.public || json.data.data.first_owner === localStorage.getItem('user')) {
                setNewItems(json.data.data.items);
                setBasketTitle(`${json.data.data.basket_name}`) ;
            }
            else{
                notification.open({message: 'Страница не доступна для просмотра'})
                navigate('/');
            }
        })
        .catch(err => {
            if(err.request.status === 400){
                notification.open({message: 'Корзины не существует'})
                navigate('/')
            }
            if(err.request.status === 403){
                notification.open({message: 'Пользователь не авторизован'})
                navigate('/login')
            }
        })
    }, []);

    const CreationItemForm = () => {
        const addItemHandle = async () => {
            const currentItemPrice = itemPrice?.current?.input?.value;
            const currentItemTitle = itemTitle?.current?.input?.value;
            if(currentItemPrice?.length !== 0 && currentItemTitle?.length !== 0 
                && currentItemPrice !== undefined && currentItemTitle !== undefined){
                    if(!!Number(currentItemPrice)){
                        const newItem : Item = {price: currentItemPrice, title: currentItemTitle}
                        const items = [...newItems, newItem]
                        await globalStore.updateBasket(`${id}`, items)                     
                        setNewItems(globalStore.currentPageItems)
                        notification.open({
                        message: 'Товар добавлен'})                    
                    }
                    else{
                        notification.open({
                            message: 'Введите число в поле цены'
                        })
                    }            
            }
        }

        return <div className="creation-item-form">
            <h2>Добавить товар</h2>
                <Form.Item label={<label className='label'>Название</label>}
                
                name={'current-item-title'}
                >                    
                    <Input ref={itemTitle}/>
                </Form.Item>
                <Form.Item 
                    label={<label className='label'>Цена</label>}
                    name={'current-item-price'}>
                    <Input ref={itemPrice}/>
                </Form.Item>
                    <Button type='primary' onClick={addItemHandle}>Добавить</Button>    
    </div>
    }
    
    const onEditBtnClick = () => {
        setIsEditing(true)
    }

    const onSaveChangeClick = () => {
        const currentTitle = pageTitle.current?.input?.value;
        globalStore.updateBasketTitle(`${id}`, `${currentTitle}`)
        setBasketTitle(`${currentTitle}`);
        setIsEditing(false)
    }

    const onDeleteItem = (itemId: String) => {
        const items = newItems.filter(item => item._id !== itemId);
        return () => {
            setNewItems(items)
            globalStore.updateBasket(`${id}`, items)
            notification.open({message: 'Товар успешно удалён'})
        }
    }
    
   return (
       <div className="currentBasketPageContainer">
            {isEditing ? <Input ref={pageTitle} addonBefore={<div style={{color: 'white'}} >Введите новое название:</div>} 
                defaultValue={`${basketTitle}`} 
                style={{width: '80%', margin: '2%'}}/> : <h1>{basketTitle}</h1>}
            {newItems.length !== 0 ? <h2>Список товаров:</h2> : <></>}
            <div className="currentBasketPage">
                {newItems.map(({title, price, _id}) =>
                    <ItemComponent  title={title} price={price}
                        isEditing={isEditing} onDeleteBtn={onDeleteItem(`${_id}`)} key={`${_id}`}/>
                )}
                {!isEditing || <CreationItemForm />}
            </div>
            {!isEditing 
            ? <Button onClick={onEditBtnClick}>Редактировать корзину<EditOutlined /></Button> 
            : <Button onClick={onSaveChangeClick}>Сохранить изменения<EditOutlined /></Button>}
       </div>
   );
};

