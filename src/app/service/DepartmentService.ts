import { plainToClass } from "class-transformer";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
import Department from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DeptRepository } from "../Repository/DepartmentRepo";

export class DepartmentService{
    DepartmentRepository: any;
    constructor(private deptRepo: DeptRepository){

    }
    getAllDepartments(){
        return this.deptRepo.getAllDepartments();
    }


    public async createDepartment(deptDetails: CreateDepartmentDto) {
        try {
            const newDept = plainToClass(Department, {
                name: deptDetails.name
            });
            const save = await this.deptRepo.saveDepartmentDetails(newDept);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    public async updateDepartment(deptId:string, deptDetails: any) {
        try {
            const newDept = plainToClass(Department, {
                name: deptDetails.name
            });
            const save = await this.deptRepo.updateDepartmentDetails(deptId, newDept);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    public async deleteDepartment(deptId:string) {
        try {
            const save = await this.deptRepo.softdeleteDepartmentDetails(deptId);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee",);
        }
    }

    }
    
    
    
    
    
    
    
    
    
    