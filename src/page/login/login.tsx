import React from 'react'
import Image from '../../public/images/iconShop2.png'
import LoginService from 'service/project-shop/login'
import Button from 'components/util/Button'
import LoginRequest from 'model/login/loginRequest';
import Cookies from "js-cookie"
import UserAuth from 'model/login/response/userAuth';
import { ServiceResponse } from 'constants/serviceResponse';
import { AxiosResponse } from 'axios'

interface IProps {
}

interface IState {
    logIn: LoginRequest
    userName: string
    password: string
}

class LoginPage extends React.PureComponent<IProps, IState> {
    private loginService: LoginService = new LoginService();

    constructor(props: IProps) {
        super(props)
        this.state = {
            logIn: new LoginRequest(),
            userName: '',
            password: ''
        }
    }

    public async login(): Promise<void> {
        const self = this
        const logIn: LoginRequest = new LoginRequest()
        const userAuth: UserAuth = new UserAuth()
        logIn.userName = this.state.userName
        logIn.password = this.state.password
        try {
            const user: AxiosResponse<UserAuth> = await self.loginService.login(logIn);
            userAuth.id = user.data.id
            userAuth.userName = user.data.userName
            userAuth.email = user.data.email
            userAuth.role = user.data.role
            await Cookies.set('user_auth', JSON.stringify(userAuth), { expires: 7, path: '' })
            window.location.href = "/shop-list"
        } catch (error) {
            console.error(error)
        }
    }

    public render(): JSX.Element {
        return (
            <div className="w-full min-h-screen text-center pt-52 bg-gradient-to-t from-green-300 via-green-500 to-green-900">
                <div className="">
                    <img className="w-40 h-40 block ml-auto mr-auto" src={Image} alt='icon-shop'></img>
                </div>
                <div className="mt-4">
                    <label>user name</label>
                    <div>
                        <input onChange={e => this.setState({ userName: e.target.value })} value={this.state.userName} className={'leading-10 border rounded h-9 w-60 p-2'}></input>
                    </div>
                </div>
                <div className="mt-4">
                    <label>password</label>
                    <div>
                        <input onChange={e => this.setState({ password: e.target.value })} value={this.state.password} type="password" className={'leading-10 border rounded h-9 w-60 p-2'}></input>
                    </div>
                </div>
                <div>
                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mr-10 mt-4" onClick={() => this.login()}>
                        เข้าสู่ระบบ
                    </Button>
                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" color="danger" onClick={() => window.location.href="/new-register"}>
                        สมัครบัญชีผู้ใช้
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginPage
