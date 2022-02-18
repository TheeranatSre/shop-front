import { AxiosResponse } from 'axios'
import Breadcrumbs from 'components/general-components/breadcrumbs/breadcrumbs'
import ProductCard from 'components/product-card/productCard'
import Button from 'components/util/Button'
import Cookies from 'js-cookie'
import BreadCrumbsModel from 'model/general-model/breadCrumbsModel'
import UserAuth from 'model/login/response/userAuth'
import ProductPageResponse from 'model/product/productPageResponse'
import React from 'react'
import Product from 'service/project-shop/product'
import Layout from '../../components/general-components/layout/layout'

interface IProps { }

interface IState {
    productModel: ProductPageResponse
    breadCrumbs: Array<BreadCrumbsModel>
}

class MyProductList extends React.PureComponent<IProps, IState> {

    private Product = new Product()

    constructor(props: IProps) {
        super(props)
        this.state = {
            breadCrumbs: [
                { name: 'รายการสินค้า', path: '/shop-list', active: true },
                { name: 'ร้านค้าของฉัน', path: '', active: false }
            ],
            productModel: new ProductPageResponse()
        }
        this.getProduct()
    }

    public async getProduct(): Promise<void> {
        const self = this
        const userAuth: UserAuth = Cookies.get('user_auth') ? JSON.parse(Cookies.get('user_auth') || '') : null
        try {
            const products: AxiosResponse<ProductPageResponse> = await self.Product.getMyProducts(userAuth.id)
            this.setState({ productModel: products.data })
        } catch (error) {
            console.error(error)
        }
    }

    public mapData(): JSX.Element {
        const result: Array<JSX.Element> = []
        this.state.productModel.entities.forEach((value) => {
            result.push(
                <ProductCard productModel={value} key={value.key} urlPath='my-card' />
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
                    <Breadcrumbs data={this.state.breadCrumbs} />
                    <div className="text-2xl">รายการสินค้าของฉัน</div>
                    <div>
                        <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" color="orange" onClick={() => window.location.href = "/create-product"}>
                            เพิ่มสินค้า
                        </Button>
                    </div>
                    <div className="flex flex-wrap">
                        {this.mapData()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProductList