import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../../shared/types/controllers.types';
import UserServices from '../services';
import HttpException from '../../../shared/utils/exceptions/http.exceptions';

export default class UserController implements Controller {
  path: string = '/users';
  router: Router = Router();

  private userServices = new UserServices();

  constructor() {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.post(`${this.path}`, this.signup);
    this.router.post(`${this.path}/login`, this.login);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userServices.signup(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userServices.login(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }
}
