import { plainToClass } from "class-transformer";
import Department from "../entities/Department";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { DeptRepository } from "../Repository/DeptRepo";
import { EmployeeRespository } from "../Repository/employeeRepo";

export class DeptService{
    DeptRepository: any;
    constructor(private deptRepo: DeptRepository){

    }
    getAllDepts(){
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
        return this.deptRepo.getAllDepts();
        // return employeeResp;
    }


    public async createDept(deptDetails: any) {
        try {
            const newDept = plainToClass(Department, {
                name: deptDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                departmentId: deptDetails.departmentId,
                // isActive: true,
            });
            const save = await this.deptRepo.saveDeptDetails(newDept);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    public async updateDept(deptId:string, deptDetails: any) {
        try {
            const newDept = plainToClass(Department, {
                name: deptDetails.name
                // username: deptDetails.username,
                // age: deptDetails.age,
                // departmentId: deptDetails.departmentId,
                // password: deptDetails.password
                // // isActive: true,
            });
            const save = await this.deptRepo.updateDeptDetails(deptId, newDept);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    public async deleteDept(deptId:string) {
        try {
            // const newDept = plainToClass(Department, {
            //     name: deptDetails.name
            //     username: deptDetails.username,
            //     age: deptDetails.age,
            //     departmentId: deptDetails.departmentId,
            //     password: deptDetails.password
            //     // isActive: true,
            // });
            const save = await this.deptRepo.softdeleteDeptDetails(deptId);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    }
    
    
    
    
    
    
    
    
    
    