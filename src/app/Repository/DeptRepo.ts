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
    }

// }
