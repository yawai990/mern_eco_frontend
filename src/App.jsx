import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home,Cart,ProductDetails,ProductLists,Login,Register } from './pages';
import { UserProfile,UserOrder,UserOrderDetails,UserCart } from './pages/user';
import { AdminUser,AdminProducts,AdminEditUser,AdminCreateProduct,AdminChat,AdminAnalytics,AdminEditProduct,AdminOrders,AdminOrderDetails } from './pages/admin';
import {ProtectRoutes} from './components';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product-list' element={<ProductLists />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectRoutes />}>

        <Route path='/user' element={<UserProfile />} />
        <Route path='/user/my-orders' element={<UserOrder />} />
        <Route path='/user/cart-details' element={<UserOrderDetails />} />
        <Route path='/user/order-details' element={<UserCart />} />

        </Route>

        <Route element={<ProtectRoutes admin={true} />}>

        <Route path='/admin/users' element={<AdminUser />} />
        <Route path='/admin/edit-user' element={<AdminEditUser />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path='/admin/create-new-products' element={<AdminCreateProduct />} />
        <Route path='/admin/edit-product' element={<AdminEditProduct />} />
        <Route path='/admin/orders' element={<AdminOrders />} />
        <Route path='/admin/order-details' element={<AdminOrderDetails />} />
        <Route path='/admin/chats' element={<AdminChat />} />
        <Route path='/admin/analytics' element={<AdminAnalytics />} />

        </Route>
        
        <Route path='*' element="Page does not exit" />
    </Routes>
    </BrowserRouter>
  )
}

export default App