/**
 * Wraps Controllers for easy import from other modules
 */
import { DeptRepository } from "../Repository/DeptRepo";
import { EmployeeRespository } from "../Repository/employeeRepo";
import { DeptService } from "../service/DeptService";
import { EmployeeService } from "../service/EmployeeService";
import DeptController from "./DeptController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DeptController(new DeptService(new DeptRepository()))
];
