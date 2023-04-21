// import './App.css'
import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { redirect } from 'react-router-dom';
import { Header } from './components';
import { MainPage, LoginPage, RegistrationPage,
   MyBasketPage, BasketCreationPage, BasketPage } from './Pages';
import { useEffect } from 'react';
import { checkAuthUser } from './api/api';
import { globalStore } from './store/store';

function App() {
  useEffect(() => {
    checkAuthUser()
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route element={<Header />} path='/'>
            <Route element={<MainPage />} path='/'/>
            <Route element={<LoginPage />} path='/login'/>
            <Route element={<RegistrationPage />} path='/registration'/>
            <Route element={<MyBasketPage />} path='/myBaskets'/>
            <Route element={<MainPage />} path='*'/>
            <Route element={<BasketCreationPage />} path='/basket/create'/>
            <Route element={<BasketPage />} path='/basket/:id'/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
