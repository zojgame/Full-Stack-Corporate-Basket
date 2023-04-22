import {  Button, Form, Input, notification  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/api';
import { globalStore } from '../../store/store';

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const onFinishHandle = (values : any) => {
        console.log('Received values of form: ', values);
        createUser(values.username, values.password)
        .then(() => {
            notification.open({
                message: globalStore.toastMessage
            })        
            navigate('/login')
        })
        .catch(err => notification.open({message: `${globalStore.toastMessage}`}))
        
        
        
    };

    const onClickRedirectToLoginPage = () => {
        navigate('/login');
    }

    return (
    <>
       <div className="register-page-container">
        <div className="register-form-container">
            <div className="register-form">
                <p>Регистрация</p>
                <Form onFinish={onFinishHandle}>
                    <Form.Item 
                    name={'username'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин входа'
                        }

                    ]}
                    >
                        <Input prefix={'💼'} placeholder='Придумайте логин для входа'/>
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
                        <div className='register-buttons'>
                            <Button type='primary' htmlType='submit'>Создать аккаунт</Button> или <p className='login-btn' 
                            onClick={onClickRedirectToLoginPage}>Войти</p>
                        </div>
                    </Form.Item>
                </Form>
                                
            </div>            
        </div>
       </div>    
    </>
   );
};
