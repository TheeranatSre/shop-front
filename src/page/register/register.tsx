import Button from 'components/util/Button'
import React from 'react'

interface IProps { }

class RegisterPage extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
    }

    public render(): JSX.Element {
        return (
            <div className="w-full min-h-screen text-center pt-52 bg-gradient-to-t from-green-300 via-green-500 to-green-900">
                <div className="leading-10 border rounded bg-blue-400 block m-auto w-96 h-16 p-3">
                    <label className="text-white font-bold">สมัครบัญชีผู้ใช้</label>
                </div>
                <div className="h-4"></div>
                <div className="leading-10 border rounded block m-auto p-4 bg-green-200 h-96 w-96">
                    <div>
                        <label>User Name</label>
                        <div>
                            <input className={'leading-10 border rounded h-9 w-60 p-2'}></input>
                        </div>
                    </div>
                    <div>
                        <label>E-mail</label>
                        <div>
                            <input className={'leading-10 border rounded h-9 w-60 p-2'}></input>
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <div>
                            <input className={'leading-10 border rounded h-9 w-60 p-2'}></input>
                        </div>
                    </div>
                    <div>
                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mr-10 mt-4" color="warning" onClick={() => window.location.href="/login"}>
                        กลับ
                    </Button>
                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" onClick={() => window.location.href="/new-register"}>
                        ยืนยัน
                    </Button>
                </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage
