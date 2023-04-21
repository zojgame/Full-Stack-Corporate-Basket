import {  Button, Form, Input, notification  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api/api';
import { globalStore } from '../../store/store';

export const LoginPage = () => {
    const navigate = useNavigate();
    const onFinishHandle = (values : any) => {
        authUser(values.username, values.password)
        .finally(() => {
            if(globalStore.isUserAuth){
                navigate('/')
            }
            notification.open({
                message: globalStore.toastMessage
            })
        })

    };

    const onClickRedirectOnRegistrationPage = () => {
        navigate('/registration');
    }

    return (
    <>
       <div className="login-page-container">
        <div className="login-form-container">
            <div className="login-form">
            <p>Авторизация</p>
                <Form onFinish={onFinishHandle}>
                    <Form.Item 
                    name={'username'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин для входа'
                        }

                    ]}
                    >
                        <Input prefix={'💼'} placeholder='Логин'/>
                    </Form.Item>
                    <Form.Item 
                    name={'password'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль для входа'
                        }

                    ]}
                    >
                        <Input prefix={'🔑'} placeholder='Пароль' type='password'/>
                    </Form.Item>
                    <Form.Item>
                        <div className='login-buttons'>
                            <Button type='primary' htmlType='submit'>Войти</Button> или <p className='register-btn' onClick={onClickRedirectOnRegistrationPage}>Создать аккаунт</p>
                        </div>
                    </Form.Item>
                </Form>
                                
            </div>            
        </div>
       </div>    
    </>
   );
};
