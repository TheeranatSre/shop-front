
import ProductPageResponse from "../../model/product/productPageResponse"
import AxiosHttpServer from '../../server/http/index'
import { ServiceResponse } from "../../constants/serviceResponse"

class Product {
    public getProducts(pageParam: string): ServiceResponse<ProductPageResponse> {
        return AxiosHttpServer.axios.get(`/products?${pageParam}`)
    }
}

export default Product
