import React from 'react'
import { AuthStoreType } from 'store/auth'
import NavBar from './sidebar'

interface IProps {
    // auth: AuthStoreType
    children: React.ReactNode
}

interface IState {
    showMobHeader: boolean
    showHeader: boolean
    isCollapse: boolean
    mobileCollapse: boolean
}

class Layout extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            showHeader: false,
            showMobHeader: false,
            isCollapse: false,
            mobileCollapse: false
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <NavBar isCollapse={(isCollapse) => this.setState({mobileCollapse: isCollapse})} />
            </div>
        )
    }
}

export default Layout