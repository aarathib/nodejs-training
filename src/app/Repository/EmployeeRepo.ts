import { DeepPartial, getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeebyId(employeeId: string){
        const employeeRepo = getConnection().getRepository(Employee);
            const employee =  await employeeRepo.findOne({where:{id:employeeId}, relations:['department','address']});
            return employee;
        
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeDetails: DeepPartial<Employee>) {
        console.log(employeeDetails);
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async getdeptEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department']});
    }

    public async softDeleteEmployeeById(empDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(empDetails);
    }

    public async getEmployeeByName(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({where: { username },});
        return employeeDetail;
    }
}
