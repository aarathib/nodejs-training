import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeebyId(employeeId: string){
        const employeeRepo = getConnection().getRepository(Employee);
        const employee =  employeeRepo.findOne(employeeId);


    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
            name: employeeDetails.name ? employeeDetails.name : undefined,
        });
        return updateEmployeeDetails;
    }

    public async getdeptEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department']});
    }

    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({
            id
        });
    }

    public async getEmployeeByName(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username },
        });
        return employeeDetail;
    }
    }
