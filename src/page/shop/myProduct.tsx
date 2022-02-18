import React from 'react'
import Layout from '../../components/general-components/layout/layout'
import BreadCrumbsModel from '../../model/general-model/breadCrumbsModel'
import Breadcrumbs from '../../components/general-components/breadcrumbs/breadcrumbs'
import Button from '../../components/util/Button'
import Image from '../../public/static/icon/productIcon.png'
import drop from '../../public/static/icon/drop.png'
import phut from '../../public/static/icon/phut.png'
import Product from '../../service/project-shop/product'
import ProductModel from '../../model/product/productModel'
import { AxiosResponse } from 'axios'
import UploadingImages from '../../components/general-components/imagesUploading/uploadingImages'

interface IProps { }

interface IState {
    breadCrumbs: Array<BreadCrumbsModel>
    productModel: ProductModel
    unitฺBuy: number
}

class MyProduct extends React.PureComponent<IProps, IState> {

    private product = new Product()

    constructor(props: IProps) {
        super(props)
        this.state = {
            breadCrumbs: [
                { name: 'รายการสินค้า', path: '/shop-list', active: true },
                { name: 'ร้านค้าของฉัน', path: '/my-products', active: true },
                { name: 'รายระเอียดสินค้า', path: '', active: false }
            ],
            productModel: new ProductModel(),
            unitฺBuy: 1
        }
        this.getProductById()
    }

    public async getProductById(): Promise<void> {
        const self = this
        const id = window.location.pathname.split('/')[2]
        try {
            const response: AxiosResponse<ProductModel> = await self.product.getProductsById(Number(id))
            self.setState({ productModel: response.data })
        } catch (error) {
            console.error(error)
        }
    }

    public unitBuyOnChange(phut: string) {
        const self = this
        let unitBy: number = this.state.unitฺBuy
        if (phut === 'phut') {
            unitBy = unitBy + 1
            if (unitBy <= this.state.productModel.unitAmount) {
                self.setState({ unitฺBuy: unitBy })
            }
        } else {
            unitBy = unitBy - 1
            if (unitBy > 0) {
                self.setState({ unitฺBuy: unitBy })
            }
        }
    }

    public inputUnitBuyOnChange(unitBy: string) {
        const self = this
        self.setState({ unitฺBuy: Number(unitBy) })
    }

    public render(): JSX.Element {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Layout>
                </Layout>
                <div className="w-9/12 block ml-auto mr-auto">
                    <div className="not-italic font-semibold text-xs leading-4 mt-4">
                        <Breadcrumbs data={this.state.breadCrumbs} />
                    </div>
                    <div className="mt-4 bg-white min-h-screen">
                        <div className='p-4 inline-flex w-full'>
                            <div>
                                <img
                                    className="w-96 h-96"
                                    src={this.state.productModel.key}
                                    alt="productImg"
                                    onError={defaultImage => {
                                        (defaultImage.target as HTMLImageElement).onerror = null;
                                        (defaultImage.target as HTMLImageElement).src = Image
                                    }}
                                />
                                <UploadingImages sendUrl={value => this.setState({ productModel: { ...this.state.productModel, ...{ key: value } } })} />
                            </div>
                            <div className='px-4 w-full'>
                                <div className=''>
                                    <label className='text-2xl'>{this.state.productModel.name}</label>
                                </div>
                                <div className='h-20'>
                                    <label className='text-xl text-gray-500'>{this.state.productModel.detail}</label>
                                </div>
                                <hr />
                                <div className='h-20'>
                                    <label className='text-5xl text-red-400'>฿{this.state.productModel.price}</label>
                                </div>
                                <hr />
                                <div className='inline-flex pt-2'>
                                    <div className='inline-flex'>
                                        <img className='w-10 h-10 cursor-pointer' src={drop} alt="drop" onClick={() => this.unitBuyOnChange('drop')} />
                                        <input className='text-center w-10' value={this.state.unitฺBuy} onChange={e => this.inputUnitBuyOnChange(e.target.value)}></input>
                                        <img className='w-10 h-10 cursor-pointer' src={phut} alt="phut" onClick={() => this.unitBuyOnChange('phut')} />
                                    </div>
                                    <div className='ml-60'>
                                        <label className='text-red-600'>จำนวนสินค้า {this.state.productModel.unitAmount} ชิน</label>
                                    </div>
                                </div>
                                <div>
                                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32 mr-10 mt-4" color="warning">
                                        ซื้อเลย
                                    </Button>
                                    <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" color="orange" onClick={() => window.location.href = "/new-register"}>
                                        เพิ่มลงรถเข็น
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProduct
