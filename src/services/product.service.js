import ProductRepository from "../repositories/product.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";
import { ProductNotFoundError } from "../errors/domain.errors.js";

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    const products = await this.productRepository.getAll();

    return products.filter((product) => product.stock > 0);
  }

  async getProductById(id) {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }

  async createProduct(data) {
    const productData = {
      ...data,
      status:
        data.stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK,
    };

    return await this.productRepository.create(productData);
  }

  async updateProduct(id, data) {
    const productData = { ...data };

    if (data.stock !== undefined) {
      productData.status =
        data.stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;
    }

    const product = await this.productRepository.update(id, productData);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }

  async deleteProduct(id) {
    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }
}

export default ProductService;
