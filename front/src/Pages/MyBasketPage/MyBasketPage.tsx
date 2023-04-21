import { ShoppingCart } from "../../components";
import { useEffect, useState } from "react";
import { getUserBaskets, checkAuthUser } from "../../api/api";
import { globalStore } from "../../store/store";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
 

export const MyBasketPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        if(!localStorage.getItem('token')){
            navigate('/login')
            notification.open({message: 'Пользователь не авторизован'}) 
        }

        setIsLoading(true);
        globalStore.getCurrentUserBaskets().then(() => {
            setIsLoading(false);
        })
        
    }, [])

   return (
       <div className="myBasketPageContainer">
            <h1>Ваши корзины</h1>
            <div className="myBasketPage">
                 <div className="createBasketBtn">
                    <p onClick={() => navigate('../basket/create')}>Создать корзину <PlusCircleOutlined style={{fontSize: 25}}/></p>
                    </div>
                {
                    !isLoading ?
                    globalStore.userBaskets.map((bas, index) => {
                        return <ShoppingCart basket={bas} key={index}/>
                    }) : <></>
                }
            </div>
       </div>
   );
};