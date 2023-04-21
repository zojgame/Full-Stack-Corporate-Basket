import { Input, Form, Button, notification, Switch, InputRef } from "antd";
import { ItemComponent } from "../../components";
import { useState, useRef } from "react";
import { Item } from "../../types/types";
import { createBasket, checkAuthUser } from "../../api/api";
import { globalStore } from "../../store/store";
import { useEffect } from "react";
import { useNavigate  } from "react-router-dom";


export const BasketCreationPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const check = async () => await checkAuthUser()
        check();
        if(!localStorage.getItem('token')){
            navigate('/login')
            notification.open({message: 'Пользователь не авторизован'})            
        }
    }, [])
    
    const itemTitle = useRef<InputRef>(null);
    const itemPrice = useRef<InputRef>(null);
    const [isSwitch, setIsSwitch] = useState(false);
    const [items, setItems] = useState<Item[]>([]);    

    const onFinishHandle = (values : any) => {
        
        createBasket(values.title, isSwitch, items)
        .catch(err => {
            notification.open({message: `Ошибка ${err}`})
            console.log(err)
        })
        .finally(() => {
            notification.open({message: globalStore.toastMessage})
            navigate('/myBaskets')
        })
    }

    const addItemHandle = () => {
        const currentItemPrice = itemPrice?.current?.input?.value;
        const currentItemTitle = itemTitle?.current?.input?.value;
        if(currentItemPrice?.length !== 0 && currentItemTitle?.length !== 0 
            && currentItemPrice !== undefined && currentItemTitle !== undefined){
                if(!!Number(currentItemPrice)){
                    const newItem : Item = {price: currentItemPrice, title: currentItemTitle}
                    const newItems = [...items, newItem]
                    setItems(newItems)
                    notification.open({
                    message: 'Товар добавлен'
            })                    
                }
                else{
                    notification.open({
                        message: 'Введите число в поле цены'
                    })
                }            
        }
    }

    const onSwitchHandle = () => {
        setIsSwitch(prev => !prev);        
    }

   return (
       <div className="pageContainer">
            <h1>Создание корзины</h1>
            <div className="basketFormFields">
                <Form onFinish={onFinishHandle}>
                    <Form.Item label={<label className='label'>Название</label>} 
                    style={{color: 'white'}}
                    name={'title'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите название корзины'
                        }
                    ]}>
                        <Input/>
                    </Form.Item>
                        {items.length !== 0 ? <h2>Товары:</h2> : <></>}
                        {items.map(({title, price}, index) => {
                            return <ItemComponent numbering={index + 1} title={title} price={price} key={index}/>
                        })}
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
                    <Form.Item label={<label className='label'>Сделать публичным</label>} 
                        valuePropName="checked" 
                        name={'isPublic'}>
                        <Switch 
                        style={{backgroundColor: isSwitch ? '#FF9200' : 'blue'}}
                        onChange={onSwitchHandle}
                        />
                     </Form.Item>
                     <Button type='primary' htmlType='submit'>Создать</Button>
                </Form>
            </div>
       </div>
   );
};