import ProductService from "../services/product.service.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getAll = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();

      res.status(200).json({
        status: "success",
        payload: products,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;

      const product = await this.productService.getProductById(id);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: product,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  create = async (req, res) => {
    try {
      const product = await this.productService.createProduct(req.body);

      res.status(201).json({
        status: "success",
        payload: product,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;

      const product = await this.productService.updateProduct(id, req.body);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: product,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const product = await this.productService.deleteProduct(id);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: product,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

export default ProductController;
