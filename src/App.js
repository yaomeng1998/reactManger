import React from 'react';
import { Button } from 'antd';
import { Routes ,Route } from 'react-router-dom';
import Login from '../src/pages/login/login'
import Admin from '../src/pages/admin/admin'
import 'antd/dist/antd.less';
function App(props) {
    return (
       <>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        </Routes>
       </>
            
    );
}

export default App;