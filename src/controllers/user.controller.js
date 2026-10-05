import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getAll();

      res.status(200).json({
        status: "success",
        payload: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.userService.getById(req.params.id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const user = await this.userService.create(req.body);

      res.status(201).json({
        status: "success",
        payload: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user = await this.userService.update(req.params.id, req.body);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user = await this.userService.delete(req.params.id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

export default UserController;
