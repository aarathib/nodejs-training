import { getConnection } from "typeorm";
import Department from "../entities/Department";
import { Employee } from "../entities/Employee";

export class DeptRepository{
    async getAllDepts(){
         const deptRepo = getConnection().getRepository(Department);
        return deptRepo.find();
    }

    public async saveDeptDetails(deptDetails: Department) {
        const deptRepo = getConnection().getRepository(Department);
        return deptRepo.save(deptDetails);
    }

    public async updateDeptDetails(deptId: string, deptDetails: any) {
        const deptRepo = getConnection().getRepository(Department);
        const updateDeptDetails = await deptRepo.update({ id: deptId, deletedAt: null }, {
            name: deptDetails.name ? deptDetails.name : undefined,
        });
        return updateDeptDetails;
    }

    public async softdeleteDeptDetails(id: string) {
        const deptRepo = getConnection().getRepository(Department);
        return deptRepo.softDelete({id});
    }

    }

// }
