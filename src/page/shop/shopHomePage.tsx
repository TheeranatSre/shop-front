import Layout from 'components/general-components/layout/layout'
import ProductPageResponse from 'model/product/productPageResponse'
import React from 'react'
import { AxiosResponse } from 'axios'
import ProductCard from 'components/product-card/productCard'
import Product from 'service/project-shop/product'
import SearchBar from 'components/general-components/searchBar/searchBar'

interface IProps { }

interface IState {
    productModel: ProductPageResponse
    searchBar: string
}

class ShopHomePage extends React.PureComponent<IProps, IState> {
    private Product = new Product()

    constructor(props: IProps) {
        super(props)
        this.state = {
            productModel: new ProductPageResponse(),
            searchBar: ''
        }
        this.getProduct()
    }

    public async getProduct(): Promise<void> {
        const self = this
        try {
            const products: AxiosResponse<ProductPageResponse> = await self.Product.getProducts('')
            console.log(products.data)
            this.setState({ productModel: products.data })
        } catch (error) {
            console.error(error)
        }
    }

    public mapData(): JSX.Element {
        const result: Array<JSX.Element> = []
        this.state.productModel.entities.forEach((value) => {
            result.push(
                <ProductCard productModel={value} key={value.key} urlPath='card' />
            )
        })
        return <>{result}</>
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
            <div className="bg-gray-100 min-h-screen">
                <Layout>
                </Layout>
                <div className="w-9/12 block ml-auto mr-auto">
                    <div className="mt-8 mr-4">
                        <SearchBar value={this.state.searchBar} onChange={value => this.handleOnChangeSearchBar(value.target.value)} />
                    </div>
                    <div className="flex flex-wrap">
                        {this.mapData()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopHomePage
