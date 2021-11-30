import * as React from 'react'

interface IProps {
    isCollapse: (isCollapse: boolean) => void
}

interface IState {
    isCollapse: boolean
}

class Sidebar extends React.Component<IProps, IState> {
    public render(): JSX.Element {
        return(
            <div>
                <i className="fab fa-shopify"></i>
                <label>shop</label>
            </div>
        )
    }
}

export default Sidebar