import './App.css'
import FrontPage from './assets/component/FrontPage'
import LoginPage from './assets/component/LoginPage'
import RegistrationPage from './assets/component/RegistrationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePage from './assets/PrivatePage/PrivatePage';
import Home from './assets/component/Home';


function App() {

  return (
    <>
     <BrowserRouter>

      <Routes>

       <Route path='/' element={<FrontPage/>}/>
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/register' element={<RegistrationPage/>}/>
       
       <Route element={<PrivatePage/>}>
        <Route path='/welcome' element={<Home/>} exact/>
       </Route>

      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
