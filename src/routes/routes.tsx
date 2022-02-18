
import Cookies from 'js-cookie';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../page/login/login';
import RegisterPage from '../page/register/register';
import ShopHomePage from '../page/shop/shopHomePage';
import PageNotFound from '../page/_general/error/PageNotFound';
import ProductDetail from '../page/shop/productDetail'
import MyProductList from '../page/shop/myProdectList'
import CreateProduct from '../page/myproduct/createProduct'
import MyProduct from '../page/shop/myProduct'

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
            <Route path="/card/:id" element={<ProductDetail />} />
            <Route path="/my-card/:id" element={<MyProduct />} />
            <Route path="/my-products" element={<MyProductList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/" element={<ShopHomePage />} />
            {Cookies.get('user_auth') ? (
                <Route path="/callback" element={<ShopHomePage />} />
            ) : (<Route element={<PageNotFound />} />)}
        </Routes>
    </>
)