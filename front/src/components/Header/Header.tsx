import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { globalStore } from "../../store/store";
import { useEffect } from "react";
import { checkAuthUser } from "../../api/api";
import { HomeOutlined, ShoppingCartOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";

export const Header = () => {
    useEffect(() => {
        checkAuthUser()
    }, [])

    const isUserAuth = localStorage.getItem('token');
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        globalStore.logoutUser();
        navigate('/')
    }    

   return (
    <>
        <div className="header">
                <div className="button" onClick={() => navigate('/')}>
                    <HomeOutlined style={{fontSize:'20px'}}/>  Главная страница</div>
                <div className="button" onClick={() => navigate('/myBaskets')}>
                    <ShoppingCartOutlined style={{fontSize:'20px'}}/>  Мои корзины</div>
                {
                    isUserAuth
                        ? <><div className="button" onClick={handleLogout}>
                            <LogoutOutlined style={{fontSize:'15px'}}/>  Выйти</div></> 
                        : 
                        <>
                            <div className="button" onClick={() => navigate('/registration')}>
                                <UserAddOutlined style={{fontSize:'20px'}}/>  Регистрация</div>
                            <div className="button" onClick={() => navigate('/login')}>
                                <LoginOutlined style={{fontSize:'15px'}}/>  Вход</div>                        
                        </>
                }
        </div>
        <Outlet />    
    </>
   );
}; 