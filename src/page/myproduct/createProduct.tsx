import Breadcrumbs from 'components/general-components/breadcrumbs/breadcrumbs'
import UploadingImages from 'components/general-components/imagesUploading/uploadingImages'
import Button from 'components/util/Button'
import BreadCrumbsModel from 'model/general-model/breadCrumbsModel'
import ProductModel from 'model/product/productModel'
import React from 'react'
import Layout from '../../components/general-components/layout/layout'
import Image from '../../public/static/icon/productIcon.png'
import drop from '../../public/static/icon/drop.png'
import phut from '../../public/static/icon/phut.png'
import Product from 'service/project-shop/product'
import { AxiosResponse } from 'axios'
import UserAuth from 'model/login/response/userAuth'
import Cookies from 'js-cookie'
import AlertBox from 'components/general-components/alert/alertBox'

interface IProps { }

interface IState {
  breadCrumbs: Array<BreadCrumbsModel>
  productModel: ProductModel
  unitฺBuy: number
}

class CreateProduct extends React.PureComponent<IProps, IState> {

  private product = new Product()

  private readonly alertBox: React.RefObject<any>

  constructor(props: IProps) {
    super(props)
    this.state = {
      breadCrumbs: [
        { name: 'รายการสินค้า', path: '/shop-list', active: true },
        { name: 'ร้านค้าของฉัน', path: '/my-products', active: true },
        { name: 'เพิ่มสินค้า', path: '', active: false }
      ],
      productModel: new ProductModel(),
      unitฺBuy: 1
    }
    this.alertBox = React.createRef()
  }

  public unitBuyOnChange(phut: string) {
    const self = this
    let unitBy: number = this.state.unitฺBuy
    if (phut === 'phut') {
      unitBy = unitBy + 1
      self.setState({ unitฺBuy: unitBy })
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

  public async creteProduct(creteProduct: ProductModel) {
    const self = this
    creteProduct.unitAmount = this.state.unitฺBuy
    const userAuth: UserAuth = Cookies.get('user_auth') ? JSON.parse(Cookies.get('user_auth') || '') : null
    try {
      await self.product.postProducts(userAuth.id, creteProduct)
      self.showAlertBox('สร้างสินค้าสำเร็จ', 'success')
    } catch (error: any) {
      this.showAlertBox('สร้างสินค้าม่สำเร็จ', 'error', error.response?.data?.errorMessage || error.stack)
      console.error(error)
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
                  <label className='text-2xl mr-1'>ชื่อสินค้า</label>
                  <input className="border rounded font-sans form-control h-8 p-2 w-full" value={this.state.productModel.name} onChange={value => this.setState({ productModel: { ...this.state.productModel, ...{ name: value.target.value } } })}></input>
                </div>
                <div className=''>
                  <label className="text-2xl">รายระเอียดสินค้า</label>
                  <textarea className="border rounded font-sans form-control w-full h-40 p-2" value={this.state.productModel.detail} onChange={value => this.setState({ productModel: { ...this.state.productModel, ...{ detail: value.target.value } } })} />
                </div>
                <div className='h-20'>
                  <label className="text-2xl mr-1">ราคา</label>
                  <label className='text-xl text-red-400'>
                    <input className="text-xl border rounded font-sans form-control h-8 p-2 w-80" value={this.state.productModel.price} onChange={value => this.setState({ productModel: { ...this.state.productModel, ...{ price: Number(value.target.value) } } })}></input>
                    ฿</label>
                </div>
                <div className="pt-2">
                  <label className="text-2xl">จำนวนสินค้า</label>
                </div>
                <div className='inline-flex pt-2'>
                  <div className='inline-flex'>
                    <img className='w-10 h-10 cursor-pointer' src={drop} alt="drop" onClick={() => this.unitBuyOnChange('drop')} />
                    <input className='text-center w-10' value={this.state.unitฺBuy} onChange={e => this.inputUnitBuyOnChange(e.target.value)}></input>
                    <img className='w-10 h-10 cursor-pointer' src={phut} alt="phut" onClick={() => this.unitBuyOnChange('phut')} />
                  </div>
                  <div className='ml-60'>
                    <label className='text-red-600'>จำนวนสินค้า {this.state.unitฺBuy} ชิน</label>
                  </div>
                </div>
                <div className="text-right">
                  <Button className=" font-normal text-sm leading-4 text-center h-9 w-32" color="primary" onClick={() => this.creteProduct(this.state.productModel)}>
                    ยืนยัน
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AlertBox ref={this.alertBox} />
      </div>
    )
  }
}

export default CreateProduct