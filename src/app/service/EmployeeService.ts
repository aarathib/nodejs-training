import { plainToClass } from "class-transformer";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import Address from "../entities/Address";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorisedException";
import { EmployeeRepository } from "../Repository/EmployeeRepo";
import { ErrorCodes } from "../util/errorCode";
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

export class EmployeeService {
  constructor(private employeeRepo: EmployeeRepository) {

  }
  getAllEmployees() {
    return this.employeeRepo.getAllEmployees();
  }
  getEmployeeById(employeeId: string) {
    return this.employeeRepo.getEmployeebyId(employeeId);
  }


  public async createEmployee(employeeDetails: CreateEmployeeDto) {
    try {
      const newAddress = plainToClass(Address, {
        addr1: employeeDetails.address.addr1,
        addr2: employeeDetails.address.addr2,
        city: employeeDetails.address.city,
        state: employeeDetails.address.state,
        country: employeeDetails.address.country,
        pincode: employeeDetails.address.pincode
      });
      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        username: employeeDetails.username,
        password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '',
        joindate: employeeDetails.joindate,
        experience: employeeDetails.experience,
        role: employeeDetails.role,
        status: employeeDetails.status,
        departmentId: employeeDetails.departmentId,
        address: newAddress
      });

      const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
      throw new HttpException(400, ErrorCodes.FAILED_TO_CREATE.CODE, ErrorCodes.FAILED_TO_CREATE.MESSAGE);
    }
  }


  public async updateEmployees(employeeId: string, employeeDetails: CreateEmployeeDto) {
    try {
      const empDetails = await this.employeeRepo.getEmployeebyId(employeeId)
      const newAddress = plainToClass(Address, {
        id: empDetails.addressId,
        addr1: employeeDetails.address.addr1,
        addr2: employeeDetails.address.addr2,
        city: employeeDetails.address.city,
        state: employeeDetails.address.state,
        country: employeeDetails.address.country,
        pincode: employeeDetails.address.pincode
      });
      const newEmployee = plainToClass(Employee, {
        id: employeeId,
        name: employeeDetails.name,
        username: employeeDetails.username,
        experience: employeeDetails.experience,
        password: employeeDetails.password,
        departmentId: employeeDetails.departmentId,
        joindate: employeeDetails.departmentId,
        status: employeeDetails.departmentId,
        role: employeeDetails.departmentId,
        address: newAddress
      });
      const save = await this.employeeRepo.updateEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
      throw new HttpException(400, ErrorCodes.FAILED_TO_UPDATE.CODE, ErrorCodes.FAILED_TO_UPDATE.MESSAGE);
    }
  }

  public async deleteEmployee(employeeId: string) {
    try {
      const empDetails = await this.employeeRepo.getEmployeebyId(employeeId);
      const save = await this.employeeRepo.softDeleteEmployeeById(empDetails);
      return save;
    } catch (err) {
      throw new HttpException(400, ErrorCodes.FAILED_TO_DELETE.CODE, ErrorCodes.FAILED_TO_DELETE.MESSAGE);
    }
  }

  public employeeLogin = async (
    name: string,
    password: string
  ) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByName(name);
    if (!employeeDetails) {
      throw new IncorrectUsernameOrPasswordException();
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        "role": employeeDetails.role
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }
  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };

}









