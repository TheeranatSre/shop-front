import Button from 'components/util/Button'
import * as React from 'react'
import Icon from '../../../public/images/iconShop2.png'
import SearchBar from '../searchBar/searchBar'
import Cookies from 'js-cookie'
import UserAuth from 'model/login/response/userAuth'
import IconPrifile from '../../../public/static/icon/profileIcon.png'

interface IProps {
    isCollapse: (isCollapse: boolean) => void
}

interface IState {
    searchBar: string
    userAuth: UserAuth | null
}

class NavBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        const userAuth: UserAuth = Cookies.get('user_auth') ? JSON.parse(Cookies.get('user_auth') || '') : null
        console.log(userAuth)
        super(props)
        this.state = {
            searchBar: '',
            userAuth: userAuth
        }
    }

    private logout(): void {
        Cookies.remove('user_auth')
        window.location.pathname = '/shop-list'
    }

    private async handleOnChangeSearchBar(value: string) {
        // if (value.length > 2 || value.length === 0) {
        //     this.setState({ searchBar: value }, () => this.getManualList(1))
        // } else {
        //     this.setState({ searchBar: value })
        // }

        this.setState({ searchBar: value })
    }

    public render(): JSX.Element {
        return (
            <div className="bg-green-600 h-24">
                <div className="w-9/12 block ml-auto mr-auto">
                    <div className="inline-flex w-full justify-between">
                        <div className="inline-flex">
                            <img className="w-20 h-20 mt-2" src={Icon} alt='icon-shop' />
                            <label className="font-sans font-bold text-5xl text-white ml-5 mt-4">shop</label>
                        </div>
                        <div className="inline-flex">
                            <div className="mt-8 mr-4">
                                <SearchBar value={this.state.searchBar} onChange={value => this.handleOnChangeSearchBar(value.target.value)} />
                            </div>
                            {Boolean(Cookies.get('user_auth')) ?
                                <div className="inline-flex">
                                    <div className="">
                                        <img className="w-16 h-16 mt-4" src={IconPrifile} alt="IconPrifile" />
                                    </div>
                                    <div className="mr-20 mt-8 ml-2">
                                        <label className="text-lg text-white">{this.state.userAuth?.userName}</label>
                                    </div>
                                    <div className="mt-4">
                                        <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mt-4 mr-2" color="danger" onClick={() => this.logout()}>
                                            ออกจากระบบ
                                        </Button>
                                    </div>
                                </div>
                                :
                                <div className="mt-4 ml-4">
                                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mt-4 mr-2" color="warning" onClick={() => window.location.href = "/new-register"}>
                                        สมคัรใหม่
                                    </Button>
                                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" onClick={() => window.location.href = "/login"}>
                                        เข้าสู่ระบบ
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar