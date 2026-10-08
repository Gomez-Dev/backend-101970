import ProductService from "../services/product.service.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getAll = async (req, res) => {
    const products = await this.productService.getAllProducts();

    res.status(200).json({
      status: "success",
      payload: products,
    });
  };

  getById = async (req, res) => {
    const { id } = req.params;

    const product = await this.productService.getProductById(id);

    res.status(200).json({
      status: "success",
      payload: product,
    });
  };

  create = async (req, res) => {
    const product = await this.productService.createProduct(req.body);

    res.status(201).json({
      status: "success",
      payload: product,
    });
  };

  update = async (req, res) => {
    const { id } = req.params;

    const product = await this.productService.updateProduct(id, req.body);

    res.status(200).json({
      status: "success",
      payload: product,
    });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const product = await this.productService.deleteProduct(id);

    res.status(200).json({
      status: "success",
      payload: product,
    });
  };
}

export default ProductController;
