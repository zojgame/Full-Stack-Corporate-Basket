import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { globalStore } from "../../store/store";
import { useEffect } from "react";
import { checkAuthUser } from "../../api/api";

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
                <div className="button" onClick={() => navigate('/')}>Главная страница</div>
                <div className="button" onClick={() => navigate('/myBaskets')}>Мои корзины</div>
                {
                    isUserAuth
                        ? <><div className="button" onClick={handleLogout}>Выйти</div></> 
                        : 
                        <>
                            <div className="button" onClick={() => navigate('/registration')}>Регистрация</div>
                            <div className="button" onClick={() => navigate('/login')}>Вход</div>                        
                        </>
                }
        </div>
        <Outlet />    
    </>
   );
}; 