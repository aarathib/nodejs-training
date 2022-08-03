import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import authorize from "../middleware/authorize";
import { CreateUUIDDto } from "../dto/CreateUUIDDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, 
    // authorize(['admin', 'superAdmin']), 
    this.getEmployee);
    // this.router.post(`${this.path}`, this.createEmployee);

    this.router.put(`${this.path}/:id`, 
    //authorize(['admin', 'superAdmin']),
    validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body), 
    validationMiddleware(CreateUUIDDto, APP_CONSTANTS.params), this.updateEmployee);

    this.router.delete(`${this.path}/:id`, 
    //authorize(['admin', 'superAdmin']),
    validationMiddleware(CreateUUIDDto, APP_CONSTANTS.params),
    //authorize(['admin', 'superAdmin']), 
    this.deleteEmployee);

    this.router.post(`${this.path}`,
    // authorize(['admin', 'superAdmin']),
    validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
    // this.asyncRouteHandler(this.createEmployee)
    this.createEmployee);
    this.router.post(`${this.path}/login`, this.login);
  }



private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    // console.log(request.body);
    const data = await this.employeeService.createEmployee(request.body);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
    );
  } catch (err) {
    next(err);
  }
}

  private getEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.updateEmployees(request.params.id, request.body);
      console.log(request.body)
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

    private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any = await this.employeeService.deleteEmployee(request.params.id);
        response.status(200);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      } catch (error) {
        return next(error);
      }
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {try{const loginData = request.body;
    console.log("In controller")
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );}
    catch(error){
      console.log(error);
      return next(error);
    }
  };

}


export default EmployeeController;