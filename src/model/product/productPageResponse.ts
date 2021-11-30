import PageInformation from './pageInformation'
import ProductModel from './productModel'

class ProductPageResponse {
  public pageInformation: PageInformation = new PageInformation

  public first: boolean = Boolean()

  public last: boolean = Boolean()

  public totalPages: number = Number()

  public totalElement: number = Number()

  public sequence: number = Number()

  public entities: Array<ProductModel> = Array<ProductModel>()
}

export default ProductPageResponse
