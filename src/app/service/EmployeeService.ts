import { plainToClass } from "class-transformer";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import Address from "../entities/Address";
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
          const newAddress = plainToClass(Address, {
            addr1: employeeDetails.address.addr1,
            addr2: employeeDetails.address.addr2,
            city: employeeDetails.address.city,
            state: employeeDetails.address.state,
            country: employeeDetails.address.country,
            pincode: employeeDetails.address.pincode
            // status: employeeDetails.status,
            // departmentId: employeeDetails.departmentId,
            // addrId: employeeDetails.addrId
            // isActive: true,
        });
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                password: employeeDetails.password? await bcrypt.hash(employeeDetails.password, 10):'',
                joindate: employeeDetails.joindate,
                experience: employeeDetails.experience,
                role: employeeDetails.role,
                status: employeeDetails.status,
                departmentId: employeeDetails.departmentId,
                address: newAddress
                // isActive: true,
            });

            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }


    public async updateEmployees(employeeId: string, employeeDetails: CreateEmployeeDto) {
        try {
        
          const empDetails = await this.employeeRepo.getEmployeebyId(employeeId)
          const newAddress = plainToClass(Address, {
            id: empDetails.address.id,
            addr1: employeeDetails.address.addr1,
            addr2: employeeDetails.address.addr2,
            city: employeeDetails.address.city,
            state: employeeDetails.address.state,
            country: employeeDetails.address.country,
            pincode: employeeDetails.address.pincode
            // status: employeeDetails.status,
            // departmentId: employeeDetails.departmentId,
            // addrId: employeeDetails.addrId
            // isActive: true,
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
                // isActive: true,
            });
            const save = await this.employeeRepo.updateEmployeeDetails(newEmployee);
            console.log(save)
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
        console.log("in service")
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
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
    
    
    
    
    
    
    
    
    
    