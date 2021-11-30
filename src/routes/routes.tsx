
import Cookies from 'js-cookie';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../page/login/login';
import RegisterPage from '../page/register/register';
import ShopHomePage from '../page/shopHomePage';
import PageNotFound from '../page/_general/error/PageNotFound';

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
            {Cookies.get('user_auth') ? (
                <Route path="/callback" element={<ShopHomePage />} />
            ) : (<Route element={<PageNotFound />} />)}
        </Routes>
    </>
)