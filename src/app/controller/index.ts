/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeRespository } from "../Repository/employeeRepo";
import { EmployeeService } from "../service/EmployeeService";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository()))
];
