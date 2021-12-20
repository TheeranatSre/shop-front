
import ProductPageResponse from "../../model/product/productPageResponse"
import AxiosHttpServer from '../../server/http/index'
import { ServiceResponse } from "../../constants/serviceResponse"
import ProductModel from "model/product/productModel"

class Product {
    public getProducts(pageParam: string): ServiceResponse<ProductPageResponse> {
        return AxiosHttpServer.axios.get(`/products?${pageParam}`)
    }

    public getProductsById(id: number): ServiceResponse<ProductModel> {
        return AxiosHttpServer.axios.get(`/carts/${id}`)
    }

    public getMyProducts(userId: number): ServiceResponse<ProductPageResponse> {
        return AxiosHttpServer.axios.get('/my-products', {
            headers: {
                userId: userId
            }
        })
    }
}

export default Product
