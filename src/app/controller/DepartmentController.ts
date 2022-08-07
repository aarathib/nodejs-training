import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import authorize from "../middleware/authorize";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";

class DepartmentController extends AbstractController {
  constructor(private deptService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/dept`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`,
      authorize(['admin', 'superadmin']),
      this.getDepartment);

    this.router.post(`${this.path}`,
      authorize(['admin', 'superadmin']),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createDepartment);

    this.router.put(`${this.path}/:id`,
      authorize(['admin', 'superadmin']),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.params),
      this.updateDepartment);

    this.router.delete(`${this.path}/:id`,
      authorize(['admin', 'superadmin']),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.params),
      this.deleteDepartment);
  }


  private getDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.deptService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data = await this.deptService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data = await this.deptService.updateDepartment(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data = await this.deptService.deleteDepartment(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

}


export default DepartmentController;