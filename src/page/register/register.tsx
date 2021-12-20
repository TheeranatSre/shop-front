import Button from 'components/util/Button'
import RegisterRequest from 'model/register/request/registerRequest';
import React from 'react'
import RegisterService from '../../service/project-shop/register'
import AlertBox from '../../components/general-components/alert/alertBox'

interface IProps { }

interface IState {
    registerRequest: RegisterRequest
    userName: string
    email: string
    password: string
}

class RegisterPage extends React.PureComponent<IProps, IState> {

    private readonly alertBox: React.RefObject<any>

    private registerService: RegisterService = new RegisterService();

    constructor(props: IProps) {
        super(props)
        this.state = {
            registerRequest: new RegisterRequest(),
            userName: '',
            email: '',
            password: ''
        }
        this.alertBox = React.createRef()
    }

    public async register(): Promise<void> {
        const self = this
        try {
            const registerRequest: RegisterRequest = new RegisterRequest()
            registerRequest.userName = this.state.userName
            registerRequest.email = this.state.email
            registerRequest.password = this.state.password
            await self.registerService.rtgister(registerRequest);
            this.showAlertBox('สมัครผู้ใช้สำเร็จ', 'success')
            window.location.href="/login"
        } catch (error: any) {
            console.error(error)
            this.showAlertBox('สมัครผู้ใช้ไม่สำเร็จ', 'error', error.response?.data?.errorMessage || error.stack)
            // this.showAlertBox('Error!', 'error', 'error')
        }
    }

    public showAlertBox(mainTitle: string, alertType: string, subTitle?: string) {
        this.alertBox.current.showBox({
            mainTitle: mainTitle,
            subTitle: subTitle,
            type: alertType,
            time: 5,
            autoClose: true,
            show: true
        })
    }

    public render(): JSX.Element {
        return (
            <div className="w-full min-h-screen text-center pt-20 bg-gradient-to-t from-green-300 via-green-500 to-green-900">
                <div className="leading-10 border rounded bg-blue-400 block m-auto w-96 h-16 p-3">
                    <label className="text-white font-bold">สมัครบัญชีผู้ใช้</label>
                </div>
                <div className="h-4"></div>
                <div className="leading-10 border rounded block m-auto p-4 bg-green-200 h-96 w-96">
                    <div>
                        <label>User Name</label>
                        <div>
                            <input className={'leading-10 border rounded h-9 w-60 p-2'} onChange={e => this.setState({ userName: e.target.value })} value={this.state.userName}></input>
                        </div>
                    </div>
                    <div>
                        <label>E-mail</label>
                        <div>
                            <input className={'leading-10 border rounded h-9 w-60 p-2'} onChange={e => this.setState({ email: e.target.value })} value={this.state.email}></input>
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <div>
                            <input className={'leading-10 border rounded h-9 w-60 p-2'} onChange={e => this.setState({ password: e.target.value })} value={this.state.password} type='password'></input>
                        </div>
                    </div>
                    <div>
                        <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mr-10 mt-4" color="warning" onClick={() => window.location.href = "/login"}>
                            กลับ
                        </Button>
                        <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" onClick={() => this.register()}>
                            ยืนยัน
                        </Button>
                    </div>
                </div>
                <AlertBox ref={this.alertBox} />
            </div>
        )
    }
}

export default RegisterPage
