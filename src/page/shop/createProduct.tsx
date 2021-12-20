import React from 'react'
import Layout from '../../components/general-components/layout/layout'

interface IProps { }

interface IState {
}

class CreateProduct extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Layout>
                </Layout>
                <div className="w-9/12 block ml-auto mr-auto">
                    <h1>Create product page</h1>
                </div>
            </div>
        )
    }
}

export default CreateProduct