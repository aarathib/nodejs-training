import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeebyId(employeeId: string){
        const employeeRepo = getConnection().getRepository(Employee);
        try {
            const employee =  await employeeRepo.findOne({where:{id:employeeId}, relations:['department','address']});
            return employee;

        } catch (err) {
                throw err
        }
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeDetails: CreateEmployeeDto) {
        console.log(employeeDetails);
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);

        // const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
        //     name: employeeDetails.name ? employeeDetails.name : undefined,
        // });
        // return updateEmployeeDetails;
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
