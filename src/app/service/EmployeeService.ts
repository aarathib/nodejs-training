import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorisedException";
import { EmployeeRespository } from "../Repository/employeeRepo";
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository){

    }
    getAllEmployees(){
        // const employeeResp = [
        //     {
        //         "id": "af168383-b350-4894-8ca3-34811ffa34ac",
        //         "name": "Rahul",
        //         "joiningDate": "2021-07-15T14:48:00.000Z",
        //         "role": "dev",
        //         "experience": 1,
        //         "status": "Active",
        //         "designation": 'Associate',
        //         "employeeProofUrl": "erer",
        //         "email": "test@test.com",
        //         "password": "123456",
        //         "departments": []
        //     },
        //     {
        //         "id": "763a5477-c283-4724-94ce-6dc7a5688685",
        //         "name": "hawari",
        //         "joiningDate": "2020-01-08T10:53:09.506Z",
        //         "role": "dev",
        //         "experience": 5,
        //         "status": "Active",
        //         "designation": "Senior",
        //         "employeeProofUrl": "http://",
        //         "email": "test@gmail.com",
        //         "password": "teereddf",
        //         "departments": [
        //             {
        //                 "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
        //                 "name": "developers"
        //             }
        //         ]
        //     }
        // ]
        return this.employeeRepo.getAllEmployees();
    }


    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                experience: employeeDetails.experience,
                departmentId: employeeDetails.departmentId,
                password: employeeDetails.password? await bcrypt.hash(employeeDetails.password, 10):''
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }


    public async updateEmployees(employeeId: string, employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                experience: employeeDetails.experience,
                password: employeeDetails.password,
                departmentId: employeeDetails.departmentId,
                // isActive: true,
            });
            const save = await this.employeeRepo.updateEmployeeDetails(employeeId, newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    public async deleteEmployee(employeeId: string) {
        try {
            // const newEmployee = plainToClass(Employee, {
            //     name: employeeDetails.name,
            //     username: employeeDetails.username,
            //     experience: employeeDetails.experience,
            //     password: employeeDetails.password,
            //     departmentId: employeeDetails.departmentId,
            //     // isActive: true,
            // });

            const save = await this.employeeRepo.softDeleteEmployeeById(employeeId);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role": "admin"
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
    
    
    
    
    
    
    
    
    
    