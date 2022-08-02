import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
// import { EmployeeService } from "../service/EmployeeService";
import { DeptService } from "../service/DeptService";

class DeptController extends AbstractController {
  constructor(private deptService: DeptService) {
    super(`${APP_CONSTANTS.apiPrefix}/dept`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getDept);
    this.router.post(`${this.path}`,
    // validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
    // this.asyncRouteHandler(this.createEmployee)
    this.createDept);
}


  private getDept = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.deptService.getAllDepts();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

private createDept = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const data = await this.deptService.createDept(request.body);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  } catch (err) {
    next(err);
  }
}

}


export default DeptController;