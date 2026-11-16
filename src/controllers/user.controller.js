import UserService from "../services/user.service.js";
import UploadService from "../services/upload.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
    this.uploadService = new UploadService();
  }

  getUsers = async (req, res) => {
    const users = await this.userService.getAll();

    res.status(200).json({
      status: "success",
      payload: users,
    });
  };

  getUserById = async (req, res) => {
    const user = await this.userService.getById(req.params.id);

    res.status(200).json({
      status: "success",
      payload: user,
    });
  };

  createUser = async (req, res) => {
    const user = await this.userService.create(req.body);

    res.status(201).json({
      status: "success",
      payload: user,
    });
  };

  updateUser = async (req, res) => {
    const user = await this.userService.update(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      payload: user,
    });
  };

  deleteUser = async (req, res) => {
    const user = await this.userService.delete(req.params.id);

    res.status(200).json({
      status: "success",
      payload: user,
    });
  };

  uploadDocument = async (req, res) => {
    const user = await this.uploadService.uploadUserDocument(
      req.params.id,
      req.file,
      req.body.documentType,
    );

    res.status(200).json({
      status: "success",
      message: "Documento cargado correctamente",
      payload: user,
    });
  };
}

export default UserController;
