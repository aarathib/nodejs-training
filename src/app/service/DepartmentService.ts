import { plainToClass } from "class-transformer";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
import Department from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DeptRepository } from "../Repository/DepartmentRepo";
import { ErrorCodes } from "../util/errorCode";

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
            throw new HttpException(400, ErrorCodes.FAILED_TO_CREATE.CODE, ErrorCodes.FAILED_TO_CREATE.MESSAGE);
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
            throw new HttpException(400, ErrorCodes.FAILED_TO_UPDATE.CODE, ErrorCodes.FAILED_TO_UPDATE.MESSAGE);
        }
    }

    public async deleteDepartment(deptId:string) {
        try {
            const save = await this.deptRepo.softdeleteDepartmentDetails(deptId);
            return save;
        } catch (err) {
            throw new HttpException(400, ErrorCodes.FAILED_TO_DELETE.CODE, ErrorCodes.FAILED_TO_DELETE.MESSAGE);
        }
    }

    }
    
    
    
    
    
    
    
    
    
    