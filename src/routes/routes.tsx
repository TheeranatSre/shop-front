
import Cookies from 'js-cookie';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../page/login/login';
import RegisterPage from '../page/register/register';
import ShopHomePage from '../page/shop/shopHomePage';
import PageNotFound from '../page/_general/error/PageNotFound';
import ProductDetail from '../page/shop/productDetail'
import MyProduct from '../page/shop/myProdect'
import CreateProduct from '../page/shop/createProduct'

interface IProps {
    // auth: AuthStoreType
    isSignedIn: boolean
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => (
    <>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new-register" element={<RegisterPage />} />
            <Route path="/shop-list" element={<ShopHomePage />} />
            <Route path="/cart/:id" element={<ProductDetail />} />
            <Route path="/my-product" element={<MyProduct />} />
            <Route path="/create-product" element={<CreateProduct />} />
            {Cookies.get('user_auth') ? (
                <Route path="/callback" element={<ShopHomePage />} />
            ) : (<Route element={<PageNotFound />} />)}
        </Routes>
    </>
)