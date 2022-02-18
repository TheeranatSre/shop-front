import ProductModel from 'model/product/productModel'
import React from 'react'
import Image from '../../public/static/icon/productIcon.png'

interface IProps {
    productModel: ProductModel
    urlPath: string
}

interface IState {
    id: number
}

class ProductCard extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            id: 2
        }
    }

    public render(): JSX.Element {
        return (
            <div className="border-2 rounded bg-white w-60 h-96 cursor-pointer m-2 hover:border-red-400" onClick={() => window.location.href=`/${this.props.urlPath}/${this.props.productModel.id}`} >
                <img
                    className="w-60 h-64"
                    src={this.props.productModel.key}
                    alt="productImg"    
                    onError={defaultImage => {
                        (defaultImage.target as HTMLImageElement).onerror = null;
                        (defaultImage.target as HTMLImageElement).src = Image
                    }}
                />
                <div className="p-2 w-full text-xs">
                    <div>
                        <label className="font-bold">{this.props.productModel.name}</label>
                    </div>
                    <div>
                        <textarea className="resize-none bg-white w-full h-16 text-gray-700 cursor-pointer" value={this.props.productModel.detail} disabled />
                    </div>
                    <div className="flex w-full justify-between">
                        <label className="text-red-500 inline-flex">{this.props.productModel.price}<p className="rm-2">บาท</p></label>
                        <label className="text-gray-400 inline-flex">{this.props.productModel.unitAmount}<p className="rm-1">ชิน</p></label>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard