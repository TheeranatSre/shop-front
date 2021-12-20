import ProductCard from 'components/product-card/productCard'
import React from 'react'
import Layout from '../../components/general-components/layout/layout'
import { AxiosResponse } from 'axios'
import ProductPageResponse from 'model/product/productPageResponse'
import Product from 'service/project-shop/product'

interface IProps { }

interface IState {
    productModel: ProductPageResponse
}

class MyProduct extends React.PureComponent<IProps, IState> {

    private Product = new Product()

    constructor(props: IProps) {
        super(props)
        this.state = {
            productModel: new ProductPageResponse()
        }
        this.getProduct()
    }

    public async getProduct(): Promise<void> {
        const self = this
        try {
            const products: AxiosResponse<ProductPageResponse> = await self.Product.getMyProducts(4)
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
                <ProductCard productModel={value} key={value.key} />
            )
        })
        return <>{result}</>
    }

    public render(): JSX.Element {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Layout>
                </Layout>
                <div className="w-9/12 block ml-auto mr-auto">
                    <div className="flex flex-wrap">
                        {this.mapData()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProduct