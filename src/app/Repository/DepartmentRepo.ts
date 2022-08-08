import { getConnection } from "typeorm";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
import Department from "../entities/Department";

export class DeptRepository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }

    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: CreateDepartmentDto) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDeptDetails = await departmentRepo.update({ id: departmentId, deletedAt: null }, {
            name: departmentDetails.name ? departmentDetails.name : undefined,
        });
        return updateDeptDetails;
    }

    public async softdeleteDepartmentDetails(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({id});
    }

}
