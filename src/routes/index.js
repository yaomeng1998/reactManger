import { Navigate} from 'react-router-dom';
import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'
import Home from '../pages/home/index'
import Pie from '../pages/charts/pie'
import Line from '../pages/charts/line'
import Bar from '../pages/charts/bar'
import Product from '../pages/product/product'
import Category from '../pages/category/catecory'
import Role from '../pages/role'
import User from '../pages/user'
import Detail from '../pages/product/detail'
import Update from '../pages/product/add-updateProduct'
import ProductHome from '../pages/product/home'
export default [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/admin',
        element: <Admin />,
        children:[
            {
                path:'home',
                element:<Home/>
            },
            {
                path:'user',
                element:<User/>
            },
            {
                path:'category',
                element:<Category/>
            },
            {
                path:'product',
                element:<Product/>,
                children:[
                    {
                        path:'',
                        element:<ProductHome/>
                    },
                    {
                        path:'detail',
                        element:<Detail/>
                    },
                    {
                        path:'add-updateProduct',
                        element:<Update/>
                    },
                ]
            },
            {
                path:'role',
                element:<Role/>
            },
            {
                path:'line',
                element:<Line/>
            },
            {
                path:'bar',
                element:<Bar/>
            },
            {
                path:'pie',
                element:<Pie/>
            },
            {
                path:'',
                element:<Home/>
            },
        ]
    },
    {
        path: '/',
        element: <Navigate to="/admin" />
    }
]